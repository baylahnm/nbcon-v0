import type { NextApiRequest, NextApiResponse } from 'next';

interface EnterpriseContactForm {
  company: string;
  email: string;
  phone?: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; error?: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { company, email, phone, message }: EnterpriseContactForm = req.body;

    // Validate required fields
    if (!company || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: company, email, and message are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // For now, log the submission and return success
    // In production, this should send an email to enterprise@nbcon.ai
    
    const emailData = {
      to: 'enterprise@nbcon.ai',
      subject: `Enterprise Inquiry - ${company}`,
      html: `
        <h2>New Enterprise Inquiry</h2>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
        <p><small>Tags: enterprise, sales, tier-upgrade</small></p>
      `,
      text: `
New Enterprise Inquiry

Company: ${company}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}

---
Submitted at: ${new Date().toISOString()}
Tags: enterprise, sales, tier-upgrade
      `,
    };

    // Log for now (replace with actual email sending)
    console.log('Enterprise Contact Form Submission:', {
      to: emailData.to,
      subject: emailData.subject,
      company,
      email,
      phone,
      timestamp: new Date().toISOString(),
    });

    // TODO: Uncomment and configure when email service is set up
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'nbcon.ai <noreply@nbcon.ai>',
    //   to: emailData.to,
    //   subject: emailData.subject,
    //   html: emailData.html,
    //   text: emailData.text,
    // });

    // Return success response
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error('Error processing enterprise contact form:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.',
    });
  }
}

