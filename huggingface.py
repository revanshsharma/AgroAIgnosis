import os
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="auto",
    api_key=os.environ["HF_TOKEN"],
)

output = client.image_classification("cats.jpg", model="linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification:fastest")
print(output)
