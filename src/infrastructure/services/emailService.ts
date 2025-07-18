import { Resend } from "resend";
import IEmailService from "../interfaces/IEmailService";

class EmailService implements IEmailService {
  private _resend: Resend;

  constructor(resend: Resend) {
    this._resend = resend;
  }

  async sendEmail(to: string[], subject: string, body: string): Promise<void> {
    await this._resend.emails.send({
      from: "Givelift <noreply@givelift.xyz>",
      to,
      subject,
      html: body
      
    });
    
  }
}

export default EmailService;
