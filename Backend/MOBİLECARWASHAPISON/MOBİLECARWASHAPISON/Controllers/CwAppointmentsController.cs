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
    public class CwAppointmentsController : ControllerBase
    {
        private readonly CarwashContext _context;

        public CwAppointmentsController(CarwashContext context)
        {
            _context = context;
        }

        // GET: api/CwAppointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CwAppointment>>> GetCwAppointments()
        {
            return await _context.CwAppointments.ToListAsync();
        }

        // GET: api/CwAppointments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CwAppointment>> GetCwAppointment(Guid id)
        {
            var cwAppointment = await _context.CwAppointments.FindAsync(id);

            if (cwAppointment == null)
            {
                return NotFound();
            }

            return cwAppointment;
        }

        // PUT: api/CwAppointments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCwAppointment(Guid id, CwAppointment cwAppointment)
        {
            if (id != cwAppointment.Id)
            {
                return BadRequest();
            }

            _context.Entry(cwAppointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CwAppointmentExists(id))
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

        // POST: api/CwAppointments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CwAppointment>> PostCwAppointment(CwAppointment cwAppointment)
        {
            cwAppointment.Id = Guid.NewGuid();
            _context.CwAppointments.Add(cwAppointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCwAppointment", new { id = cwAppointment.Id }, cwAppointment);
        }

        // DELETE: api/CwAppointments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCwAppointment(Guid id)
        {
            var cwAppointment = await _context.CwAppointments.FindAsync(id);
            if (cwAppointment == null)
            {
                return NotFound();
            }

            _context.CwAppointments.Remove(cwAppointment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CwAppointmentExists(Guid id)
        {
            return _context.CwAppointments.Any(e => e.Id == id);
        }

        // GET: api/CwAppointments/byUserOrWorker
        [HttpGet("byUserOrWorker")]
        public async Task<ActionResult<IEnumerable<CwAppointment>>> GetAppointmentsByUserOrWorker(
            [FromQuery] Guid? userId,
            [FromQuery] Guid? workerId)
        {
            // Her iki parametre de boş ise uyarı döndür
            if (userId == null && workerId == null)
            {
                return BadRequest("Lütfen en az bir tane ID değeri (userId veya workerId) giriniz.");
            }

            // Randevuları getir (Hem userId hem workerId gönderilmişse ikisini de filtreler)
            var appointments = await _context.CwAppointments
                .Where(a =>
                    (userId == null || a.UserId == userId) &&
                    (workerId == null || a.WorkerId == workerId))
                .ToListAsync();

            if (!appointments.Any())
            {
                return NotFound("Bu kriterlere uygun randevu bulunamadı.");
            }

            return Ok(appointments);
        }

    }
}
