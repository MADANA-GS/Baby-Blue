import { createContext, useEffect, useState } from "react";
import luffy from "./../assets/luffy.png";

export const AllContext = createContext();

export const AllContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const products = [
    {
      id: "abdfjdf",
      title: "Stylish Blue Denim Winter Jacket",
      originalPrice: "120",
      discountPrice: "89",
      image: luffy,
      images: [
        "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
      ],
      category: "Men",
      subcategory: "Graphic Printed",
      shortDescription: "Stay stylish and warm with this denim winter jacket.",
      longDescription:
        "Our stylish blue denim winter jacket brings a perfect balance of rugged looks and cozy comfort. Designed with attention to detail, it features strong stitching, premium fabric, and a fit that suits all body types. Ideal for casual winter outings or semi-formal gatherings, this jacket pairs effortlessly with jeans and boots. Step up your winter fashion game with this versatile piece.",
      features: [
        "Premium denim fabric",
        "Warm fleece lining",
        "Strong durable stitching",
        "Perfect for winter outings",
      ],
    },
    {
      id: "2",
      title: "Trendy White Sports Running Sneakers",
      originalPrice: "120",
      discountPrice: "89",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
      images: [
        "https://example.com/sneaker-1.jpg",
        "https://example.com/sneaker-2.jpg",
        "https://example.com/sneaker-3.jpg",
      ],
      category: "Men",
      subcategory: "Minimalist",
      shortDescription: "Run in style with these lightweight sneakers.",
      longDescription:
        "These trendy white running sneakers are made for performance and street style. Lightweight materials ensure maximum comfort during workouts or long walks. Featuring breathable mesh uppers and cushioned soles, they reduce fatigue even after hours of wear. Their minimalist look makes them perfect for everyday outfits. Boost your fitness journey with sneakers that keep you ahead.",
      features: [
        "Lightweight breathable material",
        "Non-slip sole for better grip",
        "Mesh upper for ventilation",
        "Perfect for workouts and casual wear",
      ],
    },
    {
      id: "3",
      title: "Bold Red Oversized Winter Hoodie",
      originalPrice: "150",
      discountPrice: "99",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
      images: [
        "https://example.com/oversized-hoodie-1.jpg",
        "https://example.com/oversized-hoodie-2.jpg",
        "https://example.com/oversized-hoodie-3.jpg",
      ],
      category: "Women",
      subcategory: "Oversized",
      shortDescription: "Make a bold statement with cozy comfort.",
      longDescription:
        "The bold red oversized hoodie offers style, comfort, and personality in one piece. Crafted from premium fleece, it keeps you warm during chilly evenings. With a relaxed oversized fit, it's ideal for casual days or layering over your favorite outfits. Whether lounging at home or going out with friends, this hoodie will make you stand out effortlessly.",
      features: [
        "Super soft fleece material",
        "Oversized relaxed fit",
        "Warm and cozy feel",
        "Bright bold red color",
      ],
    },
    {
      id: "4",
      title: "Anime Graphic Cotton Printed T-Shirt",
      originalPrice: "80",
      discountPrice: "49",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
      images: [
        "https://example.com/anime-shirt-1.jpg",
        "https://example.com/anime-shirt-2.jpg",
        "https://example.com/anime-shirt-3.jpg",
      ],
      category: "Women",
      subcategory: "Anime",
      shortDescription: "Showcase your anime love in comfort and style.",
      longDescription:
        "This anime graphic printed T-shirt features vibrant prints that reflect your passion for anime culture. Made with 100% breathable cotton, it offers maximum comfort for daily wear. The relaxed fit and high-quality print ensure durability even after multiple washes. Pair it with jeans or shorts to create a fun, casual look that speaks your fandom.",
      features: [
        "100% breathable cotton",
        "Durable high-quality prints",
        "Relaxed and comfortable fit",
        "Perfect for anime fans",
      ],
    },
    {
      id: "5",
      title: "Kids Premium Anime Printed Hoodie",
      originalPrice: "90",
      discountPrice: "59",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
      images: [
        "https://example.com/kids-anime-hoodie-1.jpg",
        "https://example.com/kids-anime-hoodie-2.jpg",
        "https://example.com/kids-anime-hoodie-3.jpg",
      ],
      category: "Kids",
      subcategory: "Anime",
      shortDescription: "Let kids express their anime love in style.",
      longDescription:
        "Made for the little anime fans, this kids' premium printed hoodie offers unmatched warmth and fun style. Featuring soft fleece lining and colorful anime graphics, it's ideal for school, playdates, or casual outings. The hoodie design keeps your child warm during colder days, while the bold prints make it a favorite go-to wear every season.",
      features: [
        "Soft fleece lining",
        "Fun colorful anime designs",
        "Durable stitching for kids",
        "Warm and cozy fit",
      ],
    },
    {
      id: "6",
      title: "Classic Kids Soft Cotton Sweatshirt",
      originalPrice: "70",
      discountPrice: "45",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
      images: [
        "https://example.com/kids-sweatshirt-1.jpg",
        "https://example.com/kids-sweatshirt-2.jpg",
        "https://example.com/kids-sweatshirt-3.jpg",
      ],
      category: "Kids",
      subcategory: "Sweatshirts",
      shortDescription: "A cozy sweatshirt perfect for everyday fun.",
      longDescription:
        "Our classic kids' cotton sweatshirt is perfect for school days, outdoor adventures, or relaxing at home. It features breathable, soft fabric that ensures comfort and durability. Available in charming colors, the sweatshirt provides the right mix of style and function. Whether layered or worn solo, it keeps your kids comfortable and stylish all day long.",
      features: [
        "100% soft cotton fabric",
        "Breathable and skin-friendly",
        "Charming color options",
        "Ideal for daily use",
      ],
    },
    {
      id: "7",
      title: "Matching Couple Oversized Winter Hoodies",
      originalPrice: "200",
      discountPrice: "149",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
      images: [
        "https://example.com/couple-hoodie-1.jpg",
        "https://example.com/couple-hoodie-2.jpg",
        "https://example.com/couple-hoodie-3.jpg",
      ],
      category: "Couple",
      subcategory: "Couple T-Shirts",
      shortDescription: "Show your bond with matching hoodies.",
      longDescription:
        "Celebrate love and style with these matching couple oversized hoodies. Made with soft, warm material, these hoodies provide comfort while adding a cute, coordinated look for couples. Perfect for anniversaries, casual outings, or cozy nights, these hoodies symbolize your special connection. Available in stylish designs and colors to match your vibe.",
      features: [
        "Soft cozy material",
        "Matching designs for couples",
        "Warm oversized fit",
        "Perfect gift for couples",
      ],
    },
    {
      id: "8",
      title: "Stylish Couple Matching Cotton Sweatshirts",
      originalPrice: "180",
      discountPrice: "139",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
      images: [
        "https://example.com/couple-sweatshirts-1.jpg",
        "https://example.com/couple-sweatshirts-2.jpg",
        "https://example.com/couple-sweatshirts-3.jpg",
      ],
      category: "Couple",
      subcategory: "Sweatshirts",
      shortDescription: "Stay connected and stylish together.",
      longDescription:
        "Designed for couples who love twinning, these stylish sweatshirts offer a casual yet chic vibe. The cotton blend fabric provides excellent softness and warmth. Ideal for travel, outings, or cozy evenings, these sweatshirts let you flaunt your bond in the cutest way possible. Available in easy-to-style colors that suit every couple.",
      features: [
        "Soft cotton blend",
        "Coordinated couple style",
        "Casual and comfy",
        "Available in multiple colors",
      ],
    },
    {
      id: "9",
      title: "Men's Winter Hooded Cotton Jacket",
      originalPrice: "160",
      discountPrice: "119",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
      images: [
        "https://example.com/mens-hooded-jacket-1.jpg",
        "https://example.com/mens-hooded-jacket-2.jpg",
        "https://example.com/mens-hooded-jacket-3.jpg",
      ],
      category: "Men",
      subcategory: "Hoodies",
      shortDescription: "Conquer winter with this stylish jacket.",
      longDescription:
        "This men's winter hooded cotton jacket combines functionality with urban style. With a warm fleece lining and adjustable hood, it ensures you stay protected against cold winds. The jacket’s modern cut offers a flattering fit while providing freedom of movement. Perfect for daily use, trekking, or city life during colder months.",
      features: [
        "Warm fleece lining",
        "Adjustable hoodie",
        "Water-resistant material",
        "Perfect for winter adventures",
      ],
    },
    {
      id: "10",
      title: "Minimalist White Cotton Women’s Tee",
      originalPrice: "90",
      discountPrice: "60",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
      images: [
        "https://example.com/womens-minimalist-tee-1.jpg",
        "https://example.com/womens-minimalist-tee-2.jpg",
        "https://example.com/womens-minimalist-tee-3.jpg",
      ],
      category: "Women",
      subcategory: "Minimalist",
      shortDescription: "Elevate your everyday basics effortlessly.",
      longDescription:
        "This minimalist white women’s cotton tee is a wardrobe must-have. Its soft-touch fabric ensures maximum comfort all day long. With a relaxed fit and simple design, it's versatile enough to pair with jeans, skirts, or shorts. A true staple for effortless style lovers who appreciate comfort without sacrificing fashion.",
      features: [
        "Super soft cotton",
        "Relaxed easy fit",
        "Timeless minimalist design",
        "Perfect for casual looks",
      ],
    },
    {
      id: "11",
      title: "Kids Soft Oversized Winter Sweatshirt",
      originalPrice: "85",
      discountPrice: "55",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
      images: [
        "https://example.com/kids-oversized-1.jpg",
        "https://example.com/kids-oversized-2.jpg",
        "https://example.com/kids-oversized-3.jpg",
      ],
      category: "Kids",
      subcategory: "Oversized",
      shortDescription: "Warm oversized sweatshirt for playful kids.",
      longDescription:
        "Perfect for active kids, this oversized winter sweatshirt is built for comfort and fun. Crafted from soft, cozy materials, it allows free movement and play. The oversized fit ensures extra warmth, making it ideal for outdoor adventures. Keep your little ones stylish and snug during colder seasons.",
      features: [
        "Soft cozy fabric",
        "Freedom of movement",
        "Oversized comfy fit",
        "Durable and kid-friendly",
      ],
    },
    {
      id: "12",
      title: "Couple Matching Anime Cotton Hoodies",
      originalPrice: "210",
      discountPrice: "159",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
      images: [
        "https://example.com/couple-anime-1.jpg",
        "https://example.com/couple-anime-2.jpg",
        "https://example.com/couple-anime-3.jpg",
      ],
      category: "Couple",
      subcategory: "Anime",
      shortDescription: "Celebrate love with anime-themed hoodies.",
      longDescription:
        "Designed for anime-loving couples, these matching hoodies feature vibrant anime graphics and cozy warmth. Made from premium cotton blends, they’re soft, durable, and super comfortable. Ideal for date nights, anime conventions, or casual outings. Let your shared fandom shine through with these super cute matching hoodies.",
      features: [
        "Anime inspired graphics",
        "Premium cotton blend",
        "Comfortable unisex fit",
        "Perfect for couples and anime fans",
      ],
    },
  ];
  const [cartLength, setCartLength] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    // Load orders from localStorage
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Update cart length whenever cartItems changes
  useEffect(() => {
    setCartLength(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartItems]);

  // Add to cart function - enhanced for better handling
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart with same id and size
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];

        // If a specific quantity was provided, use it, otherwise increment
        if (item.quantity) {
          updatedItems[existingItemIndex].quantity = item.quantity;
        } else {
          updatedItems[existingItemIndex].quantity += 1;
        }

        return updatedItems;
      } else {
        // Item doesn't exist, add new item with at least quantity 1
        const newItem = {
          ...item,
          quantity: item.quantity || 1,
        };
        return [...prevItems, newItem];
      }
    });
  };

  // Update quantity function - more flexible
  const updateCartItemQuantity = (id, size, quantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id && item.size === size) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      return updatedItems;
    });
  };

  // Remove from cart function
  const removeFromCart = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // Clear entire cart function
  const clearCart = () => {
    setCartItems([]);
  };

  const mainCategories = ["Men", "Women", "Kids", "Couple"];
  const subCategories = [
    "Anime",
    "Oversized",
    "Hoodies",
    "Graphic Printed",
    "Sweatshirts",
    "Minimalist",
    "Couple T-Shirts",
  ];

  const [savedAddresses, setSavedAddresses] = useState([]);

  // Orders state
  const [orders, setOrders] = useState([]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Function to add a new address
  const addAddress = (address) => {
    const newAddress = {
      id: `addr${Date.now()}`,
      ...address,
    };
    setSavedAddresses([...savedAddresses, newAddress]);
    return newAddress;
  };

  // Function to set default address
  const setDefaultAddress = (addressId) => {
    setSavedAddresses(
      savedAddresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  };

  // Function to create a new order
  const createOrder = (orderData) => {
    const newOrder = {
      id: `order${Date.now()}`,
      date: new Date().toISOString(),
      status: "Processing",
      ...orderData,
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);

    // Clear cart after successful order
    setCartItems([]);

    return newOrder;
  };

  return (
    <AllContext.Provider
      value={{
        products,
        cartLength,
        mainCategories,
        cartItems,
        subCategories,
        removeFromCart,
        addToCart,
        updateCartItemQuantity,
        clearCart,
        savedAddresses,
        setSavedAddresses,
        addAddress,
        setDefaultAddress,
        createOrder,
        orders,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
