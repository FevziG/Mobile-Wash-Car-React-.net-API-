using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MOBİLECARWASHAPISON.Entities;

namespace MOBİLECARWASHAPISON.Services
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly CarwashContext _context;

        public LoginController(CarwashContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { success = false, message = "Invalid login request" });
            }

            // Kullanıcıyı kontrol et
            var user = await _context.CwUsers
                .FirstOrDefaultAsync(u => u.Username == request.Username && u.PasswordHash == request.Password);
            if (user != null)
            {
                return Ok(new
                {
                    success = true,
                    userType = "User",
                    user = new { user.Id, user.Username, user.Email, user.Location }
                });
            }

            

            // Çalışan kontrol et
            var worker = await _context.CwWorkers
                .FirstOrDefaultAsync(w => w.Username == request.Username && w.PasswordHash == request.Password);
            if (worker != null)
            {
                return Ok(new
                {
                    success = true,
                    userType = "Worker",
                    worker = new { worker.Id, worker.Username, worker.PhoneNumber,worker.TaxNumber, worker.Email, worker.Location }
                });
            }
            // Yönetici kontrol et
            var admin = await _context.CwAdmins
                .FirstOrDefaultAsync(a => a.Username == request.Username && a.PasswordHash == request.Password);
            if (admin != null)
            {
                return Ok(new
                {
                    success = true,
                    userType = "Admin",
                    admin = new { admin.Id, admin.Username }
                });
            }

            // Eğer hiçbir eşleşme bulunamazsa
            return Unauthorized(new { success = false, message = "Invalid username or password" });
        }
    }

    // Giriş isteği modeli
    public class LoginRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}
