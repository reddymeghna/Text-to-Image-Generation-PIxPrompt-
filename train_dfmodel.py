# -*- coding: utf-8 -*-
"""train_dfmodel.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1cWSZLymdDnmGPqnFaMettkrozOBEtcFC
"""

from google.colab import drive
drive.mount('/content/drive')

!pip install torch torchvision transformers pillow matplotlib numpy tqdm

import torch
import torch.nn as nn
import torch.optim as optim
from torch.nn.utils.spectral_norm import spectral_norm

# Generator
class Generator(nn.Module):
    def __init__(self, text_dim, noise_dim, ngf):
        super(Generator, self).__init__()
        self.fc = nn.Sequential(
            nn.Linear(text_dim + noise_dim, ngf * 8 * 4 * 4),
            nn.BatchNorm1d(ngf * 8 * 4 * 4),
            nn.ReLU(True)
        )
        self.deconv = nn.Sequential(
            nn.ConvTranspose2d(ngf * 8, ngf * 4, 4, 2, 1),
            nn.BatchNorm2d(ngf * 4),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 4, ngf * 2, 4, 2, 1),
            nn.BatchNorm2d(ngf * 2),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 2, ngf, 4, 2, 1),
            nn.BatchNorm2d(ngf),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf, 3, 4, 2, 1),
            nn.Tanh()  # Output image values in range [-1, 1]
        )

    def forward(self, text_embedding, noise):
        x = torch.cat([text_embedding, noise], dim=1)
        x = self.fc(x)
        x = x.view(-1, 512, 4, 4)  # Reshape for deconvolution
        img = self.deconv(x)
        return img

# Discriminator
class Discriminator(nn.Module):
    def __init__(self, text_dim, ndf):
        super(Discriminator, self).__init__()
        self.image_branch = nn.Sequential(
            spectral_norm(nn.Conv2d(3, ndf, 4, 2, 1)),
            nn.LeakyReLU(0.2, inplace=True),
            spectral_norm(nn.Conv2d(ndf, ndf * 2, 4, 2, 1)),
            nn.BatchNorm2d(ndf * 2),
            nn.LeakyReLU(0.2, inplace=True),
            spectral_norm(nn.Conv2d(ndf * 2, ndf * 4, 4, 2, 1)),
            nn.BatchNorm2d(ndf * 4),
            nn.LeakyReLU(0.2, inplace=True),
            spectral_norm(nn.Conv2d(ndf * 4, ndf * 8, 4, 2, 1)),
            nn.BatchNorm2d(ndf * 8),
            nn.LeakyReLU(0.2, inplace=True)
        )
        self.text_branch = nn.Sequential(
            nn.Linear(text_dim, ndf * 8),
            nn.ReLU(True)
        )
        self.joint_branch = nn.Sequential(
            nn.Conv2d(ndf * 8 + ndf * 8, ndf * 8, 3, 1, 1),
            nn.BatchNorm2d(ndf * 8),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Conv2d(ndf * 8, 1, 4, 1, 0)
        )

    def forward(self, img, text_embedding):
        img_features = self.image_branch(img)
        text_features = self.text_branch(text_embedding).unsqueeze(2).unsqueeze(3)
        text_features = text_features.expand(-1, -1, img_features.size(2), img_features.size(3))
        joint_features = torch.cat([img_features, text_features], dim=1)
        validity = self.joint_branch(joint_features)
        return validity.view(-1, 1).squeeze(1)

# def train_dfgan(generator, discriminator, dataloader, text_dim, noise_dim, device, num_epochs=50):
#     # Optimizers
#     optim_G = optim.Adam(generator.parameters(), lr=0.0002, betas=(0.5, 0.999))
#     optim_D = optim.Adam(discriminator.parameters(), lr=0.0002, betas=(0.5, 0.999))

#     # Loss function
#     criterion = nn.BCEWithLogitsLoss()

#     # Training loop
#     for epoch in range(num_epochs):
#         for batch in dataloader:
#             # Prepare data
#             real_images = batch['image'].to(device)
#             captions = batch['caption_embedding'].to(device)
#             batch_size = real_images.size(0)

#             # Train Discriminator
#             noise = torch.randn(batch_size, noise_dim, device=device)
#             fake_images = generator(captions, noise)
#             real_validity = discriminator(real_images, captions)
#             fake_validity = discriminator(fake_images.detach(), captions)
#             d_loss = criterion(real_validity, torch.ones_like(real_validity)) + \
#                      criterion(fake_validity, torch.zeros_like(fake_validity))
#             optim_D.zero_grad()
#             d_loss.backward()
#             optim_D.step()

#             # Train Generator
#             fake_validity = discriminator(fake_images, captions)
#             g_loss = criterion(fake_validity, torch.ones_like(fake_validity))
#             optim_G.zero_grad()
#             g_loss.backward()
#             optim_G.step()

#         print(f"Epoch [{epoch + 1}/{num_epochs}], D Loss: {d_loss.item():.4f}, G Loss: {g_loss.item():.4f}")

#     return generator

# import pickle  # Ensure this is imported
# from torch.utils.data import DataLoader, Dataset

# class FlickrDataset(Dataset):
#     def __init__(self, preprocessed_data):
#         self.data = preprocessed_data

#     def __len__(self):
#         return len(self.data)

#     def __getitem__(self, idx):
#         return {
#             'image': self.data[idx]['image'],
#             'caption_embedding': self.data[idx]['caption_embedding']
#         }

# # Load preprocessed data
# with open('/content/drive/MyDrive/Datasets/Flickr8k/preprocessed_data.pkl', 'rb') as f:
#     preprocessed_data = pickle.load(f)

# dataset = FlickrDataset(preprocessed_data)
# dataloader = DataLoader(dataset, batch_size=32, shuffle=True)

# device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# # Initialize models
# text_dim = 768  # BERT embedding size
# noise_dim = 100  # Random noise size
# ngf = 64  # Generator feature size
# ndf = 64  # Discriminator feature size

# generator = Generator(text_dim, noise_dim, ngf).to(device)
# discriminator = Discriminator(text_dim, ndf).to(device)

# # Train the model
# trained_generator = train_dfgan(generator, discriminator, dataloader, text_dim, noise_dim, device, num_epochs=50)

# from transformers import CLIPTextModel, CLIPTokenizer  # Use CLIP for text encoding
# import torch
# import torchvision.utils as vutils
# import matplotlib.pyplot as plt


# class TextToImagePipeline:
#     def __init__(self, generator, text_encoder, tokenizer, device, noise_dim, text_dim):
#         self.generator = generator
#         self.text_encoder = text_encoder
#         self.tokenizer = tokenizer
#         self.device = device
#         self.noise_dim = noise_dim
#         self.text_dim = text_dim

#         # Add a linear layer to map text embeddings to the expected dimension
#         self.embedding_mapper = torch.nn.Linear(text_encoder.config.hidden_size, text_dim).to(device)

#     def generate_image(self, text_prompt, num_samples=1):
#         # Encode the text prompt to embeddings
#         inputs = self.tokenizer(text_prompt, return_tensors="pt", padding=True, truncation=True).to(self.device)
#         with torch.no_grad():
#             text_embeddings = self.text_encoder(**inputs).last_hidden_state.mean(dim=1)

#         # Map text embeddings to the expected dimension
#         text_embeddings = self.embedding_mapper(text_embeddings)

#         # Repeat the text embeddings to match the number of samples
#         text_embeddings = text_embeddings.repeat(num_samples, 1)

#         # Generate random noise
#         noise = torch.randn(num_samples, self.noise_dim, device=self.device)

#         # Generate images
#         with torch.no_grad():
#             generated_images = self.generator(text_embeddings, noise)

#         return generated_images




# # Load CLIP text encoder and tokenizer
# text_encoder = CLIPTextModel.from_pretrained("openai/clip-vit-base-patch32").to(device)
# tokenizer = CLIPTokenizer.from_pretrained("openai/clip-vit-base-patch32")

# # Initialize the updated pipeline
# pipeline = TextToImagePipeline(trained_generator, text_encoder, tokenizer, device, noise_dim, text_dim)

# # Generate images
# text_prompt = "A scenic view of mountains during sunrise"
# num_samples = 4
# generated_images = pipeline.generate_image(text_prompt, num_samples)

# # Display generated images
# grid = vutils.make_grid(generated_images, normalize=True, scale_each=True)
# plt.figure(figsize=(10, 10))
# plt.imshow(grid.permute(1, 2, 0).cpu().numpy())
# plt.axis('off')
# plt.title(f"Generated Images for Prompt: '{text_prompt}'")
# plt.show()

import pickle
from torch.utils.data import DataLoader, Dataset
import torch
import torch.nn as nn
import torch.optim as optim
import os
import torch.optim as optim
# Define the dataset class
class FlickrDataset(Dataset):
    def __init__(self, preprocessed_data):
        """
        Initializes the dataset with the preprocessed data.
        :param preprocessed_data: List of dictionaries with 'image' and 'caption_embedding' keys.
        """
        self.data = preprocessed_data

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return {
            'image': self.data[idx]['image'],
            'caption_embedding': self.data[idx]['caption_embedding']
        }

# Adjust this path to match your uploaded file
file_path = '/content/drive/MyDrive/Datasets/Flickr8k/preprocessed_data.pkl'  # Make sure this matches the uploaded dataset file name

# Load the preprocessed data
try:
    with open(file_path, 'rb') as f:
        preprocessed_data = pickle.load(f)

    print("Dataset loaded successfully!")
except FileNotFoundError:
    print(f"File not found at {file_path}. Please ensure the correct file is uploaded.")
    raise

# Create the dataset and dataloader
dataset = FlickrDataset(preprocessed_data)
dataloader = DataLoader(dataset, batch_size=32, shuffle=True)

# Ensure `generator` and `discriminator` models are defined before fine-tuning
def fine_tune_dfgan(generator, discriminator, dataloader, text_dim, noise_dim, device, num_epochs=50, lr=0.0001):
    """
    Fine-tune the generator and discriminator.
    """
    optim_G = optim.Adam(generator.parameters(), lr=lr, betas=(0.5, 0.999))
    optim_D = optim.Adam(discriminator.parameters(), lr=lr, betas=(0.5, 0.999))

    criterion = nn.BCEWithLogitsLoss()

    for epoch in range(num_epochs):
        for batch in dataloader:
            real_images = batch['image'].to(device)
            captions = batch['caption_embedding'].to(device)
            batch_size = real_images.size(0)

            # Train Discriminator
            noise = torch.randn(batch_size, noise_dim, device=device)
            fake_images = generator(captions, noise)
            real_validity = discriminator(real_images, captions)
            fake_validity = discriminator(fake_images.detach(), captions)

            d_loss_real = criterion(real_validity, torch.ones_like(real_validity))
            d_loss_fake = criterion(fake_validity, torch.zeros_like(fake_validity))
            d_loss = d_loss_real + d_loss_fake

            optim_D.zero_grad()
            d_loss.backward()
            optim_D.step()

            # Train Generator
            fake_validity = discriminator(fake_images, captions)
            g_loss = criterion(fake_validity, torch.ones_like(fake_validity))

            optim_G.zero_grad()
            g_loss.backward()
            optim_G.step()

        print(f"Epoch [{epoch + 1}/{num_epochs}], D Loss: {d_loss.item():.4f}, G Loss: {g_loss.item():.4f}")

    return generator, discriminator

# Fine-tune the models
text_dim = 768  # Example text embedding size
noise_dim = 100  # Example noise dimension
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

fine_tuned_generator, fine_tuned_discriminator = fine_tune_dfgan(
    generator, discriminator, dataloader, text_dim, noise_dim, device, num_epochs=50
)

# Save the fine-tuned models
save_dir = '/content/DFGAN_Models'
os.makedirs(save_dir, exist_ok=True)

# Save the generator
generator_path = os.path.join(save_dir, 'fine_tuned_generator.pth')
torch.save(fine_tuned_generator.state_dict(), generator_path)
print(f"Generator model saved at {generator_path}")

# Save the discriminator
discriminator_path = os.path.join(save_dir, 'fine_tuned_discriminator.pth')
torch.save(fine_tuned_discriminator.state_dict(), discriminator_path)
print(f"Discriminator model saved at {discriminator_path}")


# Assuming lr (learning rate) and betas are defined earlier in your code
lr = 0.0002
betas = (0.5, 0.999)

# Define optimizers
optim_G = optim.Adam(generator.parameters(), lr=lr, betas=betas)
optim_D = optim.Adam(discriminator.parameters(), lr=lr, betas=betas)

# Save Optimizer States
torch.save(optim_G.state_dict(), '/content/drive/MyDrive/DFGAN_Models/optimizer_G_state.pth')
torch.save(optim_D.state_dict(), '/content/drive/MyDrive/DFGAN_Models/optimizer_D_state.pth')

print("Generator and Discriminator optimizers saved successfully!")

# Save Optimizer States (Optional)
torch.save(optim_G.state_dict(), '/content/drive/MyDrive/DFGAN_Models/optimizer_G_state.pth')
torch.save(optim_D.state_dict(), '/content/drive/MyDrive/DFGAN_Models/optimizer_D_state.pth')

# Save Important Hyperparameters
config = {
    'text_dim': 768,
    'noise_dim': 100,
    'ngf': 64,
    'ndf': 64,
    'device': 'cuda' if torch.cuda.is_available() else 'cpu'
}

import json
with open('/content/drive/MyDrive/DFGAN_Models/config.json', 'w') as f:
    json.dump(config, f)

# Install Required Libraries (if not already installed)
!pip install torch torchvision transformers matplotlib

import torch
import torch.nn as nn
import torchvision.utils as vutils
import matplotlib.pyplot as plt
from transformers import BertTokenizer, BertModel
import json
import os

# Load Config
with open('/content/drive/MyDrive/DFGAN_Models/config.json', 'r') as f:
    config = json.load(f)

device = torch.device(config['device'])

# Define Generator
class Generator(nn.Module):
    def __init__(self, text_dim, noise_dim, ngf):
        super(Generator, self).__init__()
        self.fc = nn.Sequential(
            nn.Linear(text_dim + noise_dim, ngf * 8 * 4 * 4),
            nn.BatchNorm1d(ngf * 8 * 4 * 4),
            nn.ReLU(True)
        )
        self.deconv = nn.Sequential(
            nn.ConvTranspose2d(ngf * 8, ngf * 4, 4, 2, 1),
            nn.BatchNorm2d(ngf * 4),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 4, ngf * 2, 4, 2, 1),
            nn.BatchNorm2d(ngf * 2),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 2, ngf, 4, 2, 1),
            nn.BatchNorm2d(ngf),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf, 3, 4, 2, 1),
            nn.Tanh()
        )

    def forward(self, text_embedding, noise):
        x = torch.cat([text_embedding, noise], dim=1)
        x = self.fc(x)
        x = x.view(-1, 512, 4, 4)
        img = self.deconv(x)
        return img

# Load Generator Model
generator = Generator(config['text_dim'], config['noise_dim'], config['ngf']).to(device)
generator.load_state_dict(torch.load('/content/drive/MyDrive/DFGAN_Models/fine_tuned_generator.pth', map_location=device))
generator.eval()

# Load Text Encoder
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
bert_model = BertModel.from_pretrained("bert-base-uncased").to(device)
bert_model.eval()

# Pipeline for Image Generation
class DFGANPipeline:
    def __init__(self, generator, tokenizer, bert_model, device):
        self.generator = generator
        self.tokenizer = tokenizer
        self.bert_model = bert_model
        self.device = device

    def generate_embedding(self, text_prompt):
        with torch.no_grad():
            inputs = self.tokenizer(text_prompt, return_tensors="pt", padding=True, truncation=True).to(self.device)
            embedding = self.bert_model(**inputs).pooler_output
        return embedding

    def generate_image(self, text_prompt, num_samples):
        text_embedding = self.generate_embedding(text_prompt).repeat(num_samples, 1)
        noise = torch.randn(num_samples, config['noise_dim'], device=self.device)
        with torch.no_grad():
            generated_images = self.generator(text_embedding, noise)
        return generated_images

# Initialize Pipeline
pipeline = DFGANPipeline(generator, tokenizer, bert_model, device)

# Example Inference
text_prompt = "sunrise on mountain"
num_samples = 4
generated_images = pipeline.generate_image(text_prompt, num_samples)

# Display Generated Images
grid = vutils.make_grid(generated_images, normalize=True, scale_each=True, nrow=2)
plt.figure(figsize=(10, 10))
plt.imshow(grid.permute(1, 2, 0).cpu().numpy())
plt.axis('off')
plt.title(f"Generated Images for Prompt: '{text_prompt}'")
plt.show()

import torch
import numpy as np
from torch.utils.data import Dataset, DataLoader
from torchvision.transforms import Compose, Resize, Normalize
from torchvision.models import inception_v3, Inception_V3_Weights
from scipy.linalg import sqrtm
from tqdm import tqdm

# Device Configuration
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Example Preprocessed Dataset
preprocessed_data = [{"image": torch.randn(3, 256, 256)} for _ in range(1000)]  # Replace with your dataset

# Custom Dataset Class
class CustomFlickrDataset(Dataset):
    def __init__(self, preprocessed_data, transform=None):
        self.data = preprocessed_data
        self.transform = transform

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        item = self.data[idx]
        image = item['image']
        if self.transform:
            image = self.transform(image)
        return image

# Transformation Pipeline
transform = Compose([
    Resize((299, 299)),
    Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])

# Prepare Real Dataset
real_dataset = CustomFlickrDataset(preprocessed_data, transform=transform)
real_dataloader = DataLoader(real_dataset, batch_size=32, shuffle=False)

# Example Fake Dataset (Replace with GAN-generated images)
fake_data = [{"image": torch.randn(3, 256, 256)} for _ in range(1000)]  # Replace with generated data
fake_dataset = CustomFlickrDataset(fake_data, transform=transform)
fake_dataloader = DataLoader(fake_dataset, batch_size=32, shuffle=False)

# FID Computation Function
def compute_fid(real_loader, fake_loader, device):
    weights = Inception_V3_Weights.IMAGENET1K_V1
    inception = inception_v3(weights=weights, transform_input=False).to(device)
    inception.eval()

    def get_activations(dataloader):
        activations = []
        with torch.no_grad():
            for batch in tqdm(dataloader, desc="Computing activations"):
                batch = batch.to(device)
                if batch.size(1) != 3:  # Ensure image has 3 channels
                    batch = batch.repeat(1, 3, 1, 1)
                features = inception(batch).detach().cpu().numpy()
                activations.append(features)
        return np.concatenate(activations)

    # Get activations for real and fake datasets
    real_activations = get_activations(real_loader)
    fake_activations = get_activations(fake_loader)

    # Compute mean and covariance for real and fake activations
    mu_real, sigma_real = np.mean(real_activations, axis=0), np.cov(real_activations, rowvar=False)
    mu_fake, sigma_fake = np.mean(fake_activations, axis=0), np.cov(fake_activations, rowvar=False)

    # Compute FID score
    diff = mu_real - mu_fake
    sigma_real += np.eye(sigma_real.shape[0]) * 1e-6  # Add small value to diagonal
    sigma_fake += np.eye(sigma_fake.shape[0]) * 1e-6  # Add small value to diagonal
    covmean = sqrtm(sigma_real @ sigma_fake)

    # Handle numerical instabilities
    if np.iscomplexobj(covmean):
        covmean = covmean.real

    fid = np.sum(diff ** 2) + np.trace(sigma_real + sigma_fake - 2 * covmean)
    return fid

# Compute FID
fid_score = compute_fid(real_dataloader, fake_dataloader, device)
print(f"FID Score: {fid_score}")

