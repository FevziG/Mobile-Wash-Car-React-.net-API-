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
    public class CwWorkerServicesController : ControllerBase
    {
        private readonly CarwashContext _context;

        public CwWorkerServicesController(CarwashContext context)
        {
            _context = context;
        }

        // GET: api/CwWorkerServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CwWorkerService>>> GetCwWorkerServices()
        {
            return await _context.CwWorkerServices.ToListAsync();
        }

        // GET: api/CwWorkerServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CwWorkerService>> GetCwWorkerService(Guid id)
        {
            var cwWorkerService = await _context.CwWorkerServices.FindAsync(id);

            if (cwWorkerService == null)
            {
                return NotFound();
            }

            return cwWorkerService;
        }

        // PUT: api/CwWorkerServices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCwWorkerService(Guid id, CwWorkerService cwWorkerService)
        {
            if (id != cwWorkerService.Id)
            {
                return BadRequest();
            }

            _context.Entry(cwWorkerService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CwWorkerServiceExists(id))
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

        // POST: api/CwWorkerServices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CwWorkerService>> PostCwWorkerService(CwWorkerService cwWorkerService)
        {
            cwWorkerService.Id = Guid.NewGuid();
            _context.CwWorkerServices.Add(cwWorkerService);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCwWorkerService", new { id = cwWorkerService.Id }, cwWorkerService);
        }

        // DELETE: api/CwWorkerServices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCwWorkerService(Guid id)
        {
            var cwWorkerService = await _context.CwWorkerServices.FindAsync(id);
            if (cwWorkerService == null)
            {
                return NotFound();
            }

            _context.CwWorkerServices.Remove(cwWorkerService);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CwWorkerServiceExists(Guid id)
        {
            return _context.CwWorkerServices.Any(e => e.Id == id);
        }
    }
}
