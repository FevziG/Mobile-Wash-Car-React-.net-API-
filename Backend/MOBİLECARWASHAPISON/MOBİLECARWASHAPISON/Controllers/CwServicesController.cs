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
    public class CwServicesController : ControllerBase
    {
        private readonly CarwashContext _context;

        public CwServicesController(CarwashContext context)
        {
            _context = context;
        }

        // GET: api/CwServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CwService>>> GetCwServices()
        {
            return await _context.CwServices.ToListAsync();
        }

        // GET: api/CwServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CwService>> GetCwService(Guid id)
        {
            var cwService = await _context.CwServices.FindAsync(id);

            if (cwService == null)
            {
                return NotFound();
            }

            return cwService;
        }

        // PUT: api/CwServices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCwService(Guid id, CwService cwService)
        {
            if (id != cwService.Id)
            {
                return BadRequest();
            }

            _context.Entry(cwService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CwServiceExists(id))
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

        // POST: api/CwServices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CwService>> PostCwService(CwService cwService)
        {
            cwService.Id = Guid.NewGuid();
            _context.CwServices.Add(cwService);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCwService", new { id = cwService.Id }, cwService);
        }

        // DELETE: api/CwServices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCwService(Guid id)
        {
            var cwService = await _context.CwServices.FindAsync(id);
            if (cwService == null)
            {
                return NotFound();
            }

            _context.CwServices.Remove(cwService);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CwServiceExists(Guid id)
        {
            return _context.CwServices.Any(e => e.Id == id);
        }
    }
}
