import masalaDosa from "@/assets/dishes/masala-dosa.jpg";
import chickenBiryani from "@/assets/dishes/chicken-biryani.jpg";
import paneerButterMasala from "@/assets/dishes/paneer-butter-masala.jpg";
import samosa from "@/assets/dishes/samosa.jpg";
import idliSambar from "@/assets/dishes/idli-sambar.jpg";
import poha from "@/assets/dishes/poha.jpg";
import eggOmelette from "@/assets/dishes/egg-omelette.jpg";
import dalTadka from "@/assets/dishes/dal-tadka.jpg";
import vegBiryani from "@/assets/dishes/veg-biryani.jpg";
import palakPaneer from "@/assets/dishes/palak-paneer.jpg";
import butterChicken from "@/assets/dishes/butter-chicken.jpg";
import fishCurry from "@/assets/dishes/fish-curry.jpg";
import vadaPav from "@/assets/dishes/vada-pav.jpg";
import pavBhaji from "@/assets/dishes/pav-bhaji.jpg";
import frenchFries from "@/assets/dishes/french-fries.jpg";
import masalaChai from "@/assets/dishes/masala-chai.jpg";
import chickenSandwich from "@/assets/dishes/chicken-sandwich.jpg";
import chickenRoll from "@/assets/dishes/chicken-roll.jpg";
import mixedVegCurry from "@/assets/dishes/mixed-veg-curry.jpg";
import rotiCurry from "@/assets/dishes/roti-curry.jpg";
import margheritaPizza from "@/assets/dishes/margherita-pizza.jpg";
import pastaCarbonara from "@/assets/dishes/pasta-carbonara.jpg";
import chickenFriedRice from "@/assets/dishes/chicken-fried-rice.jpg";
import hakkaNoodles from "@/assets/dishes/hakka-noodles.jpg";
import vegLasagna from "@/assets/dishes/veg-lasagna.jpg";
import vegManchurian from "@/assets/dishes/veg-manchurian.jpg";
import springRolls from "@/assets/dishes/spring-rolls.jpg";
import choleBhature from "@/assets/dishes/chole-bhature.jpg";
import alooParatha from "@/assets/dishes/aloo-paratha.jpg";
import rajmaRice from "@/assets/dishes/rajma-rice.jpg";
import vegBurger from "@/assets/dishes/veg-burger.jpg";
import chickenBurger from "@/assets/dishes/chicken-burger.jpg";

export const dishImages: Record<string, string> = {
  "Masala Dosa": masalaDosa,
  "Chicken Biryani": chickenBiryani,
  "Paneer Butter Masala": paneerButterMasala,
  "Samosa": samosa,
  "Idli Sambar": idliSambar,
  "Poha": poha,
  "Egg Omelette": eggOmelette,
  "Dal Tadka": dalTadka,
  "Veg Biryani": vegBiryani,
  "Palak Paneer": palakPaneer,
  "Butter Chicken": butterChicken,
  "Fish Curry": fishCurry,
  "Vada Pav": vadaPav,
  "Pav Bhaji": pavBhaji,
  "French Fries": frenchFries,
  "Masala Chai": masalaChai,
  "Chicken Sandwich": chickenSandwich,
  "Chicken Roll": chickenRoll,
  "Mixed Veg Curry": mixedVegCurry,
  "Roti with Curry": rotiCurry,
  "Margherita Pizza": margheritaPizza,
  "Pasta Carbonara": pastaCarbonara,
  "Chicken Fried Rice": chickenFriedRice,
  "Hakka Noodles": hakkaNoodles,
  "Veg Lasagna": vegLasagna,
  "Veg Manchurian": vegManchurian,
  "Spring Rolls": springRolls,
  "Chole Bhature": choleBhature,
  "Aloo Paratha": alooParatha,
  "Rajma Rice": rajmaRice,
  "Veg Burger": vegBurger,
  "Chicken Burger": chickenBurger,
};

export const getImageForDish = (dishName: string): string | undefined => {
  return dishImages[dishName];
};
