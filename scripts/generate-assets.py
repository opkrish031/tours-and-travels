import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_favicon(logo_path, out_ico_path):
    img = Image.open(logo_path).convert("RGBA")
    w, h = img.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    img_cropped = img.crop((left, top, left + min_dim, top + min_dim))
    
    # Save multi-size ico
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    img_cropped.save(out_ico_path, format="ICO", sizes=sizes)
    print(f"Generated {out_ico_path}")

def create_apple_icon(logo_path, out_path, size=(180, 180)):
    img = Image.open(logo_path).convert("RGB")
    w, h = img.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    img_cropped = img.crop((left, top, left + min_dim, top + min_dim))
    resized = img_cropped.resize(size, Image.Resampling.LANCZOS)
    resized.save(out_path, format="PNG")
    print(f"Generated {out_path}")

def create_og_image(logo_path, out_png_path, out_jpeg_path=None):
    W, H = 1200, 630
    
    # Create gradient background #0B172A to #132542
    bg = Image.new("RGBA", (W, H), (11, 23, 42, 255))
    draw = ImageDraw.Draw(bg)
    
    for y in range(H):
        r = int(11 + (19 - 11) * (y / H))
        g = int(23 + (37 - 23) * (y / H))
        b = int(42 + (66 - 42) * (y / H))
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))
    
    # Gold top decorative strip
    draw.rectangle([(0, 0), (W, 8)], fill=(200, 150, 46, 255))
    
    # Elegant inner border
    draw.rounded_rectangle([(30, 30), (W - 30, H - 30)], radius=24, outline=(200, 150, 46, 70), width=2)
    
    # Load fonts
    try:
        font_serif_lg = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 46)
        font_serif_md = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 28)
        font_sans_xl = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 52)
        font_sans_lg = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 26)
        font_sans_bold = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 22)
        font_sans_sm = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 20)
    except:
        font_serif_lg = font_sans_xl = ImageFont.load_default()
        font_serif_md = font_sans_lg = font_sans_bold = font_sans_sm = font_serif_lg
    
    # Load and process circular logo badge
    logo = Image.open(logo_path).convert("RGBA")
    lw, lh = logo.size
    min_l = min(lw, lh)
    logo_sq = logo.crop(((lw - min_l)//2, (lh - min_l)//2, (lw + min_l)//2, (lh + min_l)//2))
    logo_size = 140
    logo_sq = logo_sq.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    # Circular mask
    mask = Image.new("L", (logo_size, logo_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse((0, 0, logo_size, logo_size), fill=255)
    
    # Gold ring around logo
    logo_pos = (70, 70)
    draw.ellipse((logo_pos[0]-4, logo_pos[1]-4, logo_pos[0]+logo_size+4, logo_pos[1]+logo_size+4), fill=(200, 150, 46, 255))
    draw.ellipse((logo_pos[0]-1, logo_pos[1]-1, logo_pos[0]+logo_size+1, logo_pos[1]+logo_size+1), fill=(11, 23, 42, 255))
    bg.paste(logo_sq, logo_pos, mask)
    
    # Brand text next to logo
    draw.text((235, 80), "MARWAD CABS", font=font_serif_lg, fill=(229, 184, 75, 255))
    draw.text((238, 142), "TOUR AND TRAVELS  •  JODHPUR, RAJASTHAN", font=font_sans_bold, fill=(215, 205, 185, 255))
    
    # Main Headline
    draw.text((70, 240), "Jodhpur Taxi Service & Outstation Cabs", font=font_sans_xl, fill=(255, 255, 255, 255))
    draw.text((70, 310), "Transparent Per-KM Pricing • Local Marwari Drivers • Clean AC Fleet", font=font_sans_lg, fill=(215, 205, 185, 255))
    
    # 4 Quick Rate Badges
    pills = [
        ("Sedan", "₹10 / km"),
        ("Ertiga MUV", "₹13 / km"),
        ("Innova Crysta", "₹17 / km"),
        ("Local 8Hr/80Km", "₹1,800"),
    ]
    
    start_x = 70
    pill_y = 380
    pill_h = 58
    for label, rate in pills:
        pill_w = 235
        # Background pill
        draw.rounded_rectangle([(start_x, pill_y), (start_x + pill_w, pill_y + pill_h)], radius=12, fill=(19, 37, 66, 220), outline=(200, 150, 46, 120), width=1)
        draw.text((start_x + 18, pill_y + 8), label, font=font_sans_sm, fill=(215, 205, 185, 255))
        draw.text((start_x + 18, pill_y + 28), rate, font=font_sans_bold, fill=(229, 184, 75, 255))
        start_x += pill_w + 20
    
    # Bottom Strip (divider line and contact info)
    draw.line([(70, 480), (W - 70, 480)], fill=(200, 150, 46, 60), width=1)
    
    # Phone & WhatsApp CTA button on right
    cta_text = "Call / WhatsApp: +91 94141 41414"
    bbox = font_sans_bold.getbbox(cta_text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    btn_w = tw + 48
    btn_h = 56
    btn_x = W - 70 - btn_w
    btn_y = 506
    
    draw.rounded_rectangle([(btn_x, btn_y), (btn_x + btn_w, btn_y + btn_h)], radius=28, fill=(200, 150, 46, 255))
    text_x = btn_x + (btn_w - tw) // 2
    text_y = btn_y + (btn_h - th) // 2 - 2
    draw.text((text_x, text_y), cta_text, font=font_sans_bold, fill=(11, 23, 42, 255))
    
    # Address and domain on left
    draw.text((70, 508), "Civil Airport Road, Ratanada, Jodhpur 342001", font=font_sans_sm, fill=(245, 240, 230, 255))
    draw.text((70, 538), "https://marwadcabs.com  •  booking@marwadcabs.com", font=font_sans_sm, fill=(229, 184, 75, 255))
    
    # Save output
    rgb_out = bg.convert("RGB")
    rgb_out.save(out_png_path, format="PNG")
    print(f"Generated {out_png_path}")
    if out_jpeg_path:
        rgb_out.save(out_jpeg_path, format="JPEG", quality=95)
        print(f"Generated {out_jpeg_path}")

if __name__ == "__main__":
    logo_path = "public/logo.jpeg"
    create_favicon(logo_path, "app/favicon.ico")
    create_favicon(logo_path, "public/favicon.ico")
    create_apple_icon(logo_path, "public/apple-touch-icon.png", (180, 180))
    create_apple_icon(logo_path, "public/icon-192.png", (192, 192))
    create_og_image(logo_path, "app/opengraph-image.png", "public/og-image.jpeg")
