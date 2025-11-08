import masalaDosa from "@/assets/dishes/masala-dosa.jpg";
import chickenBiryani from "@/assets/dishes/chicken-biryani.jpg";
import paneerButterMasala from "@/assets/dishes/paneer-butter-masala.jpg";
import samosa from "@/assets/dishes/samosa.jpg";

export const dishImages: Record<string, string> = {
  "Masala Dosa": masalaDosa,
  "Chicken Biryani": chickenBiryani,
  "Paneer Butter Masala": paneerButterMasala,
  "Samosa": samosa,
};

export const getImageForDish = (dishName: string): string | undefined => {
  return dishImages[dishName];
};
