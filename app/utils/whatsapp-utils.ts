export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function generateWhatsAppLink(items: CartItem[], phoneNumber: string): string {
  if (items.length === 0) return `https://wa.me/${phoneNumber}`;
  
  let message = "Hello MC Performance! I would like to inquire about the following items:\n\n";
  let total = 0;
  
  items.forEach(item => {
    message += `- ${item.quantity}x ${item.name} ($${item.price.toFixed(2)})\n`;
    total += item.price * item.quantity;
  });
  
  message += `\n*Estimated Total: $${total.toFixed(2)}*\n\n`;
  message += "Could you please confirm availability and shipping options?";
  
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
