using BackEnd_API.Interfaces;
using System.Net;
using System.Net.Http;
using System.Net.Mail;

namespace BackEnd_API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            string smtpHost = _configuration["SMTP:smtpHost"];
            int smtpPort= Convert.ToInt32( _configuration["SMTP:smtpPort"]);
            var smtpUser = _configuration["SMTP:smtpUser"] ;
            var smtpPass = _configuration["SMTP:smtpPass"];
            var smtpClien = new SmtpClient(smtpHost)
            {
                Port = smtpPort,
                Credentials = new NetworkCredential(smtpUser, smtpPass),
                EnableSsl= true,
                 DeliveryMethod = SmtpDeliveryMethod.Network,

            };
            var mailMessage = new MailMessage { 
            From=new MailAddress(smtpUser,"FINAPPP"),
            Subject = subject,
            Body = body,
            IsBodyHtml=true
            
            };
            mailMessage.To.Add(toEmail);
            try
            {
                await smtpClien.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to send email: {ex.Message}", ex);
            }
        }
    }
}
