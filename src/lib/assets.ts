export const assets = {
  logo: "/assets/logo.svg",
  logo_icon: "/assets/logo_icon.svg",
  facebook_icon: "/assets/facebook_icon.svg",
  instagram_icon: "/assets/instagram_icon.svg",
  twitter_icon: "/assets/twitter_icon.svg",
  star_icon: "/assets/star_icon.svg",
  rating_star: "/assets/rating_star.svg",
  sample_img_1: "/assets/sample_img_1.png",
  sample_img_2: "/assets/sample_img_2.png",
  profile_img_1: "/assets/profile_img_1.png",
  profile_img_2: "/assets/profile_img_2.png",
  step_icon_1: "/assets/step_icon_1.svg",
  step_icon_2: "/assets/step_icon_2.svg",
  step_icon_3: "/assets/step_icon_3.svg",
  email_icon: "/assets/email_icon.svg",
  lock_icon: "/assets/lock_icon.svg",
  cross_icon: "/assets/cross_icon.svg",
  star_group: "/assets/star_group.png",
  credit_star: "/assets/credit_star.svg",
  profile_icon: "/assets/profile_icon.png",
};

export const stepsData = [
  {
    alt: "vision logo",
    title: "Describe Your Vision",
    description:
      "Type a phrase, sentence, or paragraph that describes the image you want to create.",
    icon: assets.step_icon_1,
  },
  {
    alt: "magic star logo",
    title: "Watch the Magic",
    description:
      "Our AI-powered engine will transform your text into a high-quality, unique image in seconds.",
    icon: assets.step_icon_2,
  },
  {
    alt: "download logo",
    title: "Download & Share",
    description:
      "Instantly download your creation or share it with the world directly from our platform.",
    icon: assets.step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: assets.profile_img_1,
    name: "Donald Jackman",
    role: "Graphic Designer",
    stars: 4,
    text: "As a graphic designer, I use this platform daily. The quality of the generated images is fantastic and it saves me so much time.",
  },
  {
    image: assets.profile_img_2,
    name: "Richard Nelson",
    role: "Content Creator",
    stars: 4,
    text: "This app is a game-changer for my social media content. I can quickly generate unique visuals that grab attention and fit my brand's style.",
  },
  {
    image: assets.profile_img_1,
    name: "Jane Smith",
    role: "Marketing Manager",
    stars: 5,
    text: "The platform's speed and quality are unmatched. It has become an essential part of my workflow for creating quick visual content for campaigns.",
  },
];

type PlanType = "Basic" | "Advanced" | "Business";

export const plans = [
  {
    id: "o93k",
    name: "Basic" as PlanType,
    price: 10,
    credits: 100,
    desc: "Best for personal use.",
  },
  {
    id: "dm84",
    name: "Advanced" as PlanType,
    price: 50,
    credits: 500,
    desc: "Best for business use.",
  },
  {
    id: "em47",
    name: "Business" as PlanType,
    price: 250,
    credits: 5000,
    desc: "Best for enterprise use.",
  },
];
