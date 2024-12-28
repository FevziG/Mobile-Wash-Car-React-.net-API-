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
    public class CwPaymentsController : ControllerBase
    {
        private readonly CarwashContext _context;

        public CwPaymentsController(CarwashContext context)
        {
            _context = context;
        }

        // GET: api/CwPayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CwPayment>>> GetCwPayments()
        {
            return await _context.CwPayments.ToListAsync();
        }

        // GET: api/CwPayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CwPayment>> GetCwPayment(Guid id)
        {
            var cwPayment = await _context.CwPayments.FindAsync(id);

            if (cwPayment == null)
            {
                return NotFound();
            }

            return cwPayment;
        }

        // PUT: api/CwPayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCwPayment(Guid id, CwPayment cwPayment)
        {
            if (id != cwPayment.Id)
            {
                return BadRequest();
            }

            _context.Entry(cwPayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CwPaymentExists(id))
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

        // POST: api/CwPayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CwPayment>> PostCwPayment(CwPayment cwPayment)
        {
            cwPayment.Id = Guid.NewGuid();
            _context.CwPayments.Add(cwPayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCwPayment", new { id = cwPayment.Id }, cwPayment);
        }

        // DELETE: api/CwPayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCwPayment(Guid id)
        {
            var cwPayment = await _context.CwPayments.FindAsync(id);
            if (cwPayment == null)
            {
                return NotFound();
            }

            _context.CwPayments.Remove(cwPayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CwPaymentExists(Guid id)
        {
            return _context.CwPayments.Any(e => e.Id == id);
        }
    }
}
