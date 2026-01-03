import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Resend } from "resend";
import Parser from "rss-parser";
const app = new Hono();
app.use("*", cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"]
}));
// Newsletter subscription endpoint
const newsletterSchema = z.object({
    email: z.string().email(),
    name: z.string().optional()
});
app.post("/api/newsletter/subscribe", zValidator("json", newsletterSchema), async (c) => {
    try {
        const { email, name } = c.req.valid("json");
        // Check if email already exists
        const existing = await c.env.DB.prepare("SELECT id FROM newsletter_subscribers WHERE email = ?").bind(email).first();
        if (existing) {
            return c.json({ error: "Email already subscribed" }, 400);
        }
        // Insert new subscriber
        const result = await c.env.DB.prepare("INSERT INTO newsletter_subscribers (email, name) VALUES (?, ?)").bind(email, name || null).run();
        if (!result.success) {
            return c.json({ error: "Failed to subscribe" }, 500);
        }
        // Send confirmation email to subscriber
        if (c.env.RESEND_API_KEY) {
            try {
                const resend = new Resend(c.env.RESEND_API_KEY);
                // Send welcome email to subscriber
                await resend.emails.send({
                    from: c.env.RESEND_FROM_EMAIL || 'FLUX <khaaliahyusuf@fluxza.co.za>',
                    to: email,
                    subject: 'Welcome to FLUX Newsletter! 🚀',
                    html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td align="center" style="padding: 40px 0;">
                      <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <!-- Header -->
                        <tr>
                          <td style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: 2px;">FLUX</h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Business Solutions</p>
                          </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                          <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 24px;">Welcome${name ? ', ' + name : ''}! 🎉</h2>
                            <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                              Thank you for subscribing to the FLUX newsletter! We're thrilled to have you on board.
                            </p>
                            <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                              You'll now receive:
                            </p>
                            <ul style="margin: 0 0 20px 0; padding-left: 20px; color: #4b5563; font-size: 16px; line-height: 1.8;">
                              <li>Expert digital marketing insights and strategies</li>
                              <li>Industry trends and best practices</li>
                              <li>Exclusive tips to grow your business online</li>
                              <li>Updates on our latest services and offerings</li>
                            </ul>
                            <p style="margin: 0 0 25px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                              Stay tuned for valuable content that will help transform your brand's digital presence!
                            </p>
                            <table role="presentation" style="margin: 0 auto;">
                              <tr>
                                <td style="border-radius: 6px; background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);">
                                  <a href="https://r5lyhozoklce4.mocha.app" style="display: inline-block; padding: 14px 30px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">
                                    Visit Our Website
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                          <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                              FLUX Business Solutions<br>
                              Transforming brands through innovative digital marketing
                            </p>
                            <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px;">
                              📧 khaaliahyusuf@fluxza.co.za | 📞 068 900 2098
                            </p>
                            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                              You're receiving this email because you subscribed to our newsletter.<br>
                              If you no longer wish to receive these emails, you can unsubscribe at any time.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
                });
                // Send notification to admin
                await resend.emails.send({
                    from: c.env.RESEND_FROM_EMAIL || 'FLUX <khaaliahyusuf@fluxza.co.za>',
                    to: 'khaaliahyusuf@fluxza.co.za',
                    subject: '🎉 New Newsletter Subscriber',
                    html: `
              <!DOCTYPE html>
              <html>
                <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
                    <h2 style="color: #1f2937; margin-top: 0;">New Newsletter Subscriber</h2>
                    <p style="color: #4b5563; font-size: 16px;">You have a new subscriber to your newsletter:</p>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                      <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Name:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${name || 'Not provided'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Email:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${email}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; font-weight: bold; color: #6b7280;">Subscribed at:</td>
                        <td style="padding: 10px; color: #1f2937;">${new Date().toLocaleString()}</td>
                      </tr>
                    </table>
                    <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                      This is an automated notification from your FLUX website.
                    </p>
                  </div>
                </body>
              </html>
            `,
                });
            }
            catch (emailError) {
                console.error("Email sending error:", emailError);
                // Don't fail the request if email fails - subscription is already saved
            }
        }
        return c.json({ message: "Successfully subscribed to newsletter", id: result.meta.last_row_id });
    }
    catch (error) {
        console.error("Newsletter subscription error:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
});
// Contact form endpoint
const contactSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    company: z.string().optional(),
    message: z.string().min(1)
});
app.post("/api/contact", zValidator("json", contactSchema), async (c) => {
    try {
        const data = c.req.valid("json");
        const result = await c.env.DB.prepare("INSERT INTO contact_leads (name, email, phone, company, message) VALUES (?, ?, ?, ?, ?)").bind(data.name, data.email, data.phone || null, data.company || null, data.message).run();
        if (!result.success) {
            return c.json({ error: "Failed to submit contact form" }, 500);
        }
        // Send email notification to admin
        if (c.env.RESEND_API_KEY) {
            try {
                const resend = new Resend(c.env.RESEND_API_KEY);
                await resend.emails.send({
                    from: c.env.RESEND_FROM_EMAIL || 'FLUX <khaaliahyusuf@fluxza.co.za>',
                    to: 'khaaliahyusuf@fluxza.co.za',
                    subject: `🔥 New Contact Form Submission from ${data.name}`,
                    html: `
            <!DOCTYPE html>
            <html>
              <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #000000;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; padding: 30px; border-radius: 8px; border: 2px solid #FF10F0;">
                  <h2 style="color: #FF10F0; margin-top: 0; text-shadow: 0 0 10px rgba(255, 16, 240, 0.8);">⚡ New Contact Form Submission</h2>
                  <p style="color: #ffffff; font-size: 16px;">You have received a new contact form submission:</p>
                  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Name:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Email:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.email}</td>
                    </tr>
                    ${data.phone ? `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Phone:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.phone}</td>
                    </tr>
                    ` : ''}
                    ${data.company ? `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Company:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.company}</td>
                    </tr>
                    ` : ''}
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Message:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.message}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; font-weight: bold; color: #00FFFF;">Submitted at:</td>
                      <td style="padding: 10px; color: #ffffff;">${new Date().toLocaleString()}</td>
                    </tr>
                  </table>
                  <p style="color: #B84FFF; font-size: 14px; margin-top: 20px;">
                    This is an automated notification from your FLUX website.
                  </p>
                </div>
              </body>
            </html>
          `,
                });
            }
            catch (emailError) {
                console.error("Email sending error:", emailError);
                // Don't fail the request if email fails
            }
        }
        return c.json({ message: "Contact form submitted successfully", id: result.meta.last_row_id });
    }
    catch (error) {
        console.error("Contact form error:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
});
// Appointment booking endpoint
const appointmentSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    company: z.string().optional(),
    service_type: z.string().optional(),
    preferred_date: z.string(),
    preferred_time: z.string(),
    message: z.string().optional()
});
app.post("/api/appointments", zValidator("json", appointmentSchema), async (c) => {
    try {
        const data = c.req.valid("json");
        const result = await c.env.DB.prepare("INSERT INTO appointments (name, email, phone, company, service_type, preferred_date, preferred_time, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(data.name, data.email, data.phone || null, data.company || null, data.service_type || null, data.preferred_date, data.preferred_time, data.message || null).run();
        if (!result.success) {
            return c.json({ error: "Failed to submit appointment request" }, 500);
        }
        // Send email notification to admin
        if (c.env.RESEND_API_KEY) {
            try {
                const resend = new Resend(c.env.RESEND_API_KEY);
                await resend.emails.send({
                    from: c.env.RESEND_FROM_EMAIL || 'FLUX <khaaliahyusuf@fluxza.co.za>',
                    to: 'khaaliahyusuf@fluxza.co.za',
                    subject: `📅 New Consultation Request from ${data.name}`,
                    html: `
            <!DOCTYPE html>
            <html>
              <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #000000;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; padding: 30px; border-radius: 8px; border: 2px solid #CCFF00;">
                  <h2 style="color: #CCFF00; margin-top: 0; text-shadow: 0 0 10px rgba(204, 255, 0, 0.8);">📅 New Consultation Request</h2>
                  <p style="color: #ffffff; font-size: 16px;">You have received a new consultation request:</p>
                  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Name:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Email:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.email}</td>
                    </tr>
                    ${data.phone ? `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Phone:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.phone}</td>
                    </tr>
                    ` : ''}
                    ${data.company ? `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Company:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.company}</td>
                    </tr>
                    ` : ''}
                    ${data.service_type ? `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Service:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.service_type}</td>
                    </tr>
                    ` : ''}
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Preferred Date:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.preferred_date}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Preferred Time:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.preferred_time}</td>
                    </tr>
                    ${data.message ? `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #00FFFF;">Message:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ffffff;">${data.message}</td>
                    </tr>
                    ` : ''}
                    <tr>
                      <td style="padding: 10px; font-weight: bold; color: #00FFFF;">Submitted at:</td>
                      <td style="padding: 10px; color: #ffffff;">${new Date().toLocaleString()}</td>
                    </tr>
                  </table>
                  <p style="color: #B84FFF; font-size: 14px; margin-top: 20px;">
                    This is an automated notification from your FLUX website.
                  </p>
                </div>
              </body>
            </html>
          `,
                });
            }
            catch (emailError) {
                console.error("Email sending error:", emailError);
                // Don't fail the request if email fails
            }
        }
        return c.json({ message: "Appointment request submitted successfully", id: result.meta.last_row_id });
    }
    catch (error) {
        console.error("Appointment booking error:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
});
// Get blog posts endpoint
app.get("/api/blogposts", async (c) => {
    try {
        const category = c.req.query("category");
        let query = "SELECT * FROM external_blog_posts ORDER BY published_date DESC";
        let bindings = [];
        if (category && category !== "All") {
            query = "SELECT * FROM external_blog_posts WHERE category = ? ORDER BY published_date DESC";
            bindings = [category];
        }
        const stmt = c.env.DB.prepare(query);
        const { results } = bindings.length > 0 ? await stmt.bind(...bindings).all() : await stmt.all();
        return c.json({ blogPosts: results || [] });
    }
    catch (error) {
        console.error("Blog posts fetch error:", error);
        return c.json({ error: "Failed to fetch blog posts" }, 500);
    }
});
// RSS feed ingestion endpoint (can be called manually or via cron)
app.post("/api/sync-rss-feed", async (c) => {
    try {
        // Fetch the RSS feed using native fetch API
        const response = await fetch('https://www.marketingdive.com/feeds/news/');
        if (!response.ok) {
            throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
        }
        const xmlText = await response.text();
        const parser = new Parser();
        const feed = await parser.parseString(xmlText);
        let newCount = 0;
        let updatedCount = 0;
        for (const item of feed.items) {
            // Extract image URL from various possible sources
            let imageUrl = '';
            if (item.enclosure?.url) {
                imageUrl = item.enclosure.url;
            }
            else if (item['media:content']?.$ && item['media:content'].$.url) {
                imageUrl = item['media:content'].$.url;
            }
            else if (item['media:thumbnail']?.$ && item['media:thumbnail'].$.url) {
                imageUrl = item['media:thumbnail'].$.url;
            }
            // Extract categories
            let category = 'Marketing';
            if (item.categories && item.categories.length > 0) {
                category = item.categories[0];
            }
            // Create excerpt from content or description
            let excerpt = item.contentSnippet || item.content || item.description || '';
            // Strip HTML tags if present
            excerpt = excerpt.replace(/<[^>]*>/g, '');
            excerpt = excerpt.substring(0, 200).trim();
            if (excerpt.length === 200) {
                excerpt += '...';
            }
            // Check if post already exists
            const existing = await c.env.DB.prepare("SELECT id FROM external_blog_posts WHERE link = ?").bind(item.link).first();
            if (existing) {
                // Update existing post
                await c.env.DB.prepare("UPDATE external_blog_posts SET title = ?, excerpt = ?, image_url = ?, published_date = ?, author = ?, category = ?, updated_at = CURRENT_TIMESTAMP WHERE link = ?").bind(item.title, excerpt, imageUrl, item.isoDate || new Date().toISOString(), item.creator || item.author || 'Marketing Dive', category, item.link).run();
                updatedCount++;
            }
            else {
                // Insert new post
                await c.env.DB.prepare("INSERT INTO external_blog_posts (external_id, title, link, excerpt, image_url, published_date, author, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(item.guid || item.link, item.title, item.link, excerpt, imageUrl, item.isoDate || new Date().toISOString(), item.creator || item.author || 'Marketing Dive', category).run();
                newCount++;
            }
        }
        return c.json({
            message: "RSS feed synced successfully",
            newPosts: newCount,
            updatedPosts: updatedCount,
            totalProcessed: feed.items.length
        });
    }
    catch (error) {
        console.error("RSS sync error:", error);
        return c.json({ error: "Failed to sync RSS feed", details: error.message }, 500);
    }
});
// Get testimonials endpoint
app.get("/api/testimonials", async (c) => {
    try {
        const testimonials = await c.env.DB.prepare("SELECT * FROM testimonials WHERE is_active = true ORDER BY is_featured DESC, created_at DESC").all();
        return c.json({ testimonials: testimonials.results || [] });
    }
    catch (error) {
        console.error("Testimonials fetch error:", error);
        return c.json({ error: "Failed to fetch testimonials" }, 500);
    }
});
// Create testimonial endpoint (for admin use)
const testimonialSchema = z.object({
    client_name: z.string().min(1),
    client_company: z.string().optional(),
    client_position: z.string().optional(),
    testimonial_text: z.string().min(1),
    rating: z.number().min(1).max(5).optional(),
    is_featured: z.boolean().default(false)
});
app.post("/api/testimonials", zValidator("json", testimonialSchema), async (c) => {
    try {
        const data = c.req.valid("json");
        const result = await c.env.DB.prepare("INSERT INTO testimonials (client_name, client_company, client_position, testimonial_text, rating, is_featured) VALUES (?, ?, ?, ?, ?, ?)").bind(data.client_name, data.client_company || null, data.client_position || null, data.testimonial_text, data.rating || null, data.is_featured).run();
        if (result.success) {
            return c.json({ message: "Testimonial created successfully", id: result.meta.last_row_id });
        }
        else {
            return c.json({ error: "Failed to create testimonial" }, 500);
        }
    }
    catch (error) {
        console.error("Testimonial creation error:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
});
export default app;
