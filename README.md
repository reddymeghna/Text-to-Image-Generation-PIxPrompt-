# 🧠 Text-to-Image Generation Chatbot using GANs & LLMs

This project is an end-to-end **Text-to-Image generation chatbot** that generates realistic images from natural language prompts using two pipelines:

1. ✅ **Fine-tuned GAN-based model** (trained on preprocessed COCO dataset)
2. ✅ **Hugging Face inference API** (baseline benchmark)

---

## 🚀 Project Highlights

- 🔁 **Preprocessing COCO dataset** for training
- 🧠 **Custom-trained Conditional GAN (cGAN)** using PyTorch & CNNs
- 🤖 **Flask middleware chatbot** to input prompts & serve results
- 🔍 **Compare outputs**: Hugging Face API vs Trained Model
- 🧪 Display **training parameters, loss metrics, and sample generations**

---

## 🧰 Tech Stack

| Layer        | Tools/Frameworks                                     |
|--------------|------------------------------------------------------|
| Language     | Python 3.10                                          |
| Model        | GAN (Generator + Discriminator), CNN                |
| Dataset      | COCO (captions + images), tokenized & cleaned        |
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

**Model:** Conditional GAN (cGAN)  
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






