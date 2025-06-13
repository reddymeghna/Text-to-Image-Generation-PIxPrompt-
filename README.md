# 🧠 Text-to-Image Generation Chatbot using GANs & Hugging face transformers

This project is an end-to-end **Text-to-Image generation chatbot** that generates realistic images from natural language prompts using two pipelines:

1. ✅ **Fine-tuned GAN-based model** (trained on preprocessed COCO dataset)
2. ✅ **Used DF-GAN for image generation** (baseline benchmark)

---


<p align="center">
  <img src="https://img.shields.io/badge/Built%20With-Flask-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/GAN-df-gan%20FastAPI-orange?style=for-the-badge" />
  
</p>

## 🚀 Project Highlights

- 🔁 **Preprocessing FLICKR 8K dataset** for training
- 🧠 **Custom-trained DF-GAN** using PyTorch & CNNs
- 🤖 **Flask middleware chatbot** to input prompts & serve results
- 🔍 **Compare outputs**: Hugging Face API vs Trained Model
- 🧪 Display **training parameters, loss metrics, and sample generations**

---

## 🧰 Tech Stack

| Layer        | Tools/Frameworks                                     |
|--------------|------------------------------------------------------|
| Language     | Python 3.10                                          |
| Model        | Flux model and DF-GAN(Generator + Discriminator), CNN|
| Dataset      | FLICKR 8K (captions + images), tokenized & cleaned   |
| Libraries    | PyTorch, torchvision, matplotlib, PIL, Flask         |
| Inference    | Hugging Face `CompVis/stable-diffusion-v1-4`         |
| Frontend     | Simple HTML + JS or Postman (API testing)            |

---


---

## 🧪 Dataset Preprocessing

- Used `pycocotools` to load annotations
- Tokenized captions using NLTK
- Applied transforms: resize, normalization, augmentations (flip, crop)
- Stored pairs: `(image_tensor, caption_tensor)` for training

---

## 🎓 Training Details

**Model:** DF-GAN
**Training Time:** ~5 hours (NVIDIA RTX 3060)  
**Epochs:** 100  
**Loss Function:** Binary Cross-Entropy  
**Optimizer:** Adam (lr=0.0002, betas=(0.5, 0.999))  

### 🧮 Parameters:
| Parameter        | Value     |
|------------------|-----------|
| Embedding Size   | 256       |
| Image Size       | 64x64     |
| Batch Size       | 64        |
| Caption Max Len  | 15 tokens |

---


The Architecture Diagram is:
![Screenshot (187)](https://github.com/user-attachments/assets/ccd88176-c738-410e-b168-187b6e76f1de)


Generated Image from given text from three models(general model, by df-gan, by external api)
![Screenshot (186)](https://github.com/user-attachments/assets/52c9efe0-40e4-40b0-8c43-55723e7fd9d8)



![Screenshot (159)](https://github.com/user-attachments/assets/859ca7da-61d7-4cbd-9a84-af70e8d24f94)
