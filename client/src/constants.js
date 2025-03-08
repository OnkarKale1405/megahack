const productData = {
    brinjal: {
        alsoKnownAs: ["Baingan", "Eggplant", "Aubergine", "Vankaya", "Kathirikkai"],
        basicInfo: "Brinjal (Solanum melongena) is a popular vegetable in Indian and global cuisines, known for its glossy purple skin and spongy texture. It comes in various shapes, sizes, and colors ranging from deep purple to green or white. Brinjal has a mild, earthy flavor that absorbs spices and other flavors well, making it a staple in curries and stews.",
        healthInfo: "Brinjal is a low-calorie vegetable rich in fiber, vitamins, and minerals. It contains antioxidants like nasunin, which helps protect brain cells from damage. Brinjal is also known to improve heart health, aid digestion, and regulate blood sugar levels. Its high potassium content helps maintain blood pressure.",
        bestUses: "Brinjal is widely used in Indian dishes like Baingan Bharta, Bharwa Baingan, and various curries. It can be grilled, roasted, fried, or stuffed with spices. Thin slices can be breaded and fried, while larger varieties work well for stuffing or roasting.",
        seasonUpdate: "The current harvest of brinjal is fresh and tender with vibrant color. Store brinjals in a cool, dry place or in the refrigerator for longer shelf life. Avoid cutting until ready to use to prevent browning."
    },
    lettuce: {
        alsoKnownAs: ["Salad Patta", "Salad Leaf", "Kasmisaag"],
        basicInfo: "Lettuce (Lactuca sativa) is a leafy vegetable widely used in salads, sandwiches, and wraps. It comes in various types including Romaine, Iceberg, Butterhead, and Leaf Lettuce. Lettuce is known for its crisp texture and refreshing taste.",
        healthInfo: "Lettuce is low in calories and high in water content, making it hydrating and light. It is rich in vitamins A, K, and C, along with folate and fiber. Darker green varieties like Romaine are particularly high in antioxidants and nutrients that support heart health and bone strength.",
        bestUses: "Lettuce is best enjoyed raw in salads, burgers, sandwiches, and wraps. It can also be lightly grilled or added to soups. Romaine lettuce is often used in Caesar salads, while Iceberg is popular for its crunch in sandwiches.",
        seasonUpdate: "Fresh lettuce with crisp leaves is currently in season. Store in the refrigerator in a plastic bag with paper towels to absorb moisture. Consume within a few days for the best taste and texture."
    },
    avocado: {
        alsoKnownAs: ["Butter Fruit", "Makhanphal", "Persea americana"],
        basicInfo: "Avocado is a creamy, nutrient-rich fruit widely consumed around the world. It has a mild, buttery taste and is known for its high healthy fat content. Avocados can range from small to large, with green or black skin and a large central seed.",
        healthInfo: "Avocados are a rich source of monounsaturated fats, which support heart health. They are also high in fiber, potassium, and vitamins C, E, and K. Regular consumption can improve cholesterol levels, enhance digestion, and provide antioxidant protection.",
        bestUses: "Avocados are commonly used in salads, sandwiches, and guacamole. They can be mashed for spreads, sliced for toast, or blended into smoothies. Avocados are also great as a topping on tacos or added to grain bowls.",
        seasonUpdate: "The current avocado supply is ripe with creamy texture. Store unripe avocados at room temperature until they soften, then refrigerate to extend shelf life. Sprinkle with lemon juice to prevent browning once cut."
    },
    potato: {
        alsoKnownAs: ["Aloo", "Batata", "Urulai Kizhangu", "Alugadde"],
        basicInfo: "Potatoes (Solanum tuberosum) are one of the most widely consumed vegetables globally. They are starchy tubers with a mild, earthy flavor and versatile texture. Potatoes come in various types like russet, red, white, and baby potatoes, each suited for different cooking methods.",
        healthInfo: "Potatoes are rich in carbohydrates, making them a great source of energy. They contain vitamin C, potassium, and B vitamins. The fiber in potatoes helps improve digestion, while their antioxidants support heart health. Consuming boiled or baked potatoes is healthier than fried versions.",
        bestUses: "Potatoes can be boiled, mashed, roasted, fried, or baked. They are widely used in Indian curries like Aloo Matar and Dum Aloo, or simply as Aloo Paratha stuffing. French fries, mashed potatoes, and potato salads are popular in global cuisines.",
        seasonUpdate: "Freshly harvested potatoes are currently available with firm texture and clean skin. Store in a cool, dark, dry place. Avoid refrigerating raw potatoes as it alters their flavor and texture."
    },
    mutter: {
        alsoKnownAs: ["Green Peas", "Matar", "Pattani", "Vatana"],
        basicInfo: "Mutter (Pisum sativum) are small, round, green legumes widely used in Indian and global cuisines. They have a sweet, delicate flavor and soft texture when cooked. Green peas are both a vegetable and a source of plant-based protein.",
        healthInfo: "Green peas are rich in protein, fiber, and vitamins like A, C, and K. They contain antioxidants and anti-inflammatory compounds that support heart health and blood sugar regulation. The high fiber content aids digestion and promotes gut health.",
        bestUses: "Mutter is a key ingredient in dishes like Mutter Paneer, Aloo Mutter, and Peas Pulao. It can be added to soups, curries, salads, and rice dishes. Fresh peas are best used in season, while frozen peas are a convenient year-round option.",
        seasonUpdate: "Fresh green peas are currently in season with a sweet taste and vibrant green color. Store shelled peas in the refrigerator and use within a few days or freeze them for long-term storage."
    },
    strawberry: {
        alsoKnownAs: ["Strawberries", "Fragaria", "Strawburry"],
        basicInfo: "Strawberries (Fragaria × ananassa) are sweet, juicy fruits with a vibrant red color and tiny seeds on the surface. They are widely loved for their flavor and are often consumed fresh or in desserts.",
        healthInfo: "Strawberries are rich in vitamin C, antioxidants, and fiber. They help boost immunity, improve skin health, and regulate blood sugar. The antioxidants in strawberries are known to reduce inflammation and support heart health.",
        bestUses: "Strawberries can be enjoyed fresh, in fruit salads, smoothies, desserts like strawberry shortcake, or as jam. They also pair well with chocolate, yogurt, and cereals.",
        seasonUpdate: "Fresh strawberries are currently available with bright red color and sweet taste. Store in the refrigerator and consume within a few days. Wash just before eating to maintain freshness."
    },
    onion: {
        alsoKnownAs: ["Pyaz", "Kanda", "Dungri", "Ulli"],
        basicInfo: "Onions (Allium cepa) are versatile vegetables that form the foundation of countless dishes across global cuisines. In India, they are an essential ingredient in most savory preparations. Onions can vary in color from white to yellow to red/purple, and in flavor from mild to sharp and pungent.",
        healthInfo: "Onions are rich in antioxidants, particularly quercetin which has anti-inflammatory properties. They also contain sulfur compounds that may help reduce cholesterol levels and blood pressure. Onions are a good source of vitamin C, B vitamins, potassium, and dietary fiber. Regular consumption of onions has been linked to improved heart health, better blood sugar control, and enhanced immune function.",
        bestUses: "Onions can be enjoyed raw in salads and sandwiches, or cooked in various ways including sautéing, caramelizing, roasting, and pickling. They form the base of many curries, soups, stews, and sauces. Different varieties of onions are suited for different culinary applications; red onions are often preferred raw, while yellow onions are ideal for cooking and caramelizing.",
        seasonUpdate: "The current harvest of onions is of excellent quality with good size and flavor. Store in a cool, dry place with good ventilation for maximum shelf life. To reduce tearing when cutting onions, try chilling them before cutting or using a sharp knife to minimize cell damage which releases the compounds that cause eye irritation."
    }
}

export const getProductInfo = (productName) => {
    const name = productName.toLowerCase();
    console.log(name);
    return productData[name] || { error: "Product not found" };
};