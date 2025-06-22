interface IEmailService {
  
  sendEmail(to: string[], subject: string, body: string): Promise<void>;
}
export default IEmailService;