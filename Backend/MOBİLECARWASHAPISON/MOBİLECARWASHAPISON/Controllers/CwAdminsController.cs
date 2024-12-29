using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MOBİLECARWASHAPISON.Entities;

namespace MOBİLECARWASHAPISON.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CwAdminsController : ControllerBase
    {
        private readonly CarwashContext _context;

        public CwAdminsController(CarwashContext context)
        {
            _context = context;
        }

        // GET: api/CwAdmins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CwAdmin>>> GetCwAdmins()
        {
            return await _context.CwAdmins.ToListAsync();
        }

        // GET: api/CwAdmins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CwAdmin>> GetCwAdmin(Guid id)
        {
            var cwAdmin = await _context.CwAdmins.FindAsync(id);

            if (cwAdmin == null)
            {
                return NotFound();
            }

            return cwAdmin;
        }

        // PUT: api/CwAdmins/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCwAdmin(Guid id, CwAdmin cwAdmin)
        {
            if (id != cwAdmin.Id)
            {
                return BadRequest();
            }

            _context.Entry(cwAdmin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CwAdminExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CwAdmins
        [HttpPost]
        public async Task<ActionResult<CwAdmin>> PostCwAdmin(CwAdmin cwAdmin)
        {
            // Kullanıcı adının var olup olmadığını kontrol et
            var existingAdmin = await _context.CwAdmins
                                              .FirstOrDefaultAsync(a => a.Username == cwAdmin.Username);

            if (existingAdmin != null)
            {
                // Eğer admin adı varsa, hata döndürelim
                return Ok(new { success = false, message = "Username already exists." });
            }

            // Yeni admin kaydını oluştur
            cwAdmin.Id = Guid.NewGuid();  // id'yi backend oluşturuyor
            _context.CwAdmins.Add(cwAdmin);
            await _context.SaveChangesAsync();

            // Yeni kaydedilen admini başarıyla döndürelim
            return CreatedAtAction("GetCwAdmin", new { id = cwAdmin.Id }, new { success = true, message = "Registration successful" });
        }



        // DELETE: api/CwAdmins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCwAdmin(Guid id)
        {
            var cwAdmin = await _context.CwAdmins.FindAsync(id);
            if (cwAdmin == null)
            {
                return NotFound();
            }

            _context.CwAdmins.Remove(cwAdmin);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CwAdminExists(Guid id)
        {
            return _context.CwAdmins.Any(e => e.Id == id);
        }
    }
}
