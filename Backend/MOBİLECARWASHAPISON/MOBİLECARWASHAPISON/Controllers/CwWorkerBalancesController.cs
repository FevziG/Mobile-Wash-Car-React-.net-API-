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
    public class CwWorkerBalancesController : ControllerBase
    {
        private readonly CarwashContext _context;

        public CwWorkerBalancesController(CarwashContext context)
        {
            _context = context;
        }

        // GET: api/CwWorkerBalances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CwWorkerBalance>>> GetCwWorkerBalances()
        {
            return await _context.CwWorkerBalances.ToListAsync();
        }

        // GET: api/CwWorkerBalances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CwWorkerBalance>> GetCwWorkerBalance(Guid id)
        {
            var cwWorkerBalance = await _context.CwWorkerBalances.FindAsync(id);

            if (cwWorkerBalance == null)
            {
                return NotFound();
            }

            return cwWorkerBalance;
        }

        // PUT: api/CwWorkerBalances/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCwWorkerBalance(Guid id, CwWorkerBalance cwWorkerBalance)
        {
            if (id != cwWorkerBalance.Id)
            {
                return BadRequest();
            }

            _context.Entry(cwWorkerBalance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CwWorkerBalanceExists(id))
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

        // POST: api/CwWorkerBalances
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CwWorkerBalance>> PostCwWorkerBalance(CwWorkerBalance cwWorkerBalance)
        {
            cwWorkerBalance.Id = Guid.NewGuid();
            _context.CwWorkerBalances.Add(cwWorkerBalance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCwWorkerBalance", new { id = cwWorkerBalance.Id }, cwWorkerBalance);
        }

        // DELETE: api/CwWorkerBalances/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCwWorkerBalance(Guid id)
        {
            var cwWorkerBalance = await _context.CwWorkerBalances.FindAsync(id);
            if (cwWorkerBalance == null)
            {
                return NotFound();
            }

            _context.CwWorkerBalances.Remove(cwWorkerBalance);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CwWorkerBalanceExists(Guid id)
        {
            return _context.CwWorkerBalances.Any(e => e.Id == id);
        }
    }
}
