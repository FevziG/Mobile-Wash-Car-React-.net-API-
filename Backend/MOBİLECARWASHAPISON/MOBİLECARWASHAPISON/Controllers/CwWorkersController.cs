using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MOBILECARWASHAPISON.Entities;
using MOBİLECARWASHAPISON.Entities;

namespace MOBILECARWASHAPISON.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CwWorkersController : ControllerBase
    {
        private readonly CarwashContext _context;

        public CwWorkersController(CarwashContext context)
        {
            _context = context;
        }

        // GET: api/CwWorkers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CwWorker>>> GetCwWorkers()
        {
            return await _context.CwWorkers.ToListAsync();
        }

        // GET: api/CwWorkers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CwWorker>> GetCwWorker(Guid id)
        {
            var cwWorker = await _context.CwWorkers.FindAsync(id);

            if (cwWorker == null)
            {
                return NotFound();
            }

            return cwWorker;
        }

        // PUT: api/CwWorkers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCwWorker(Guid id, CwWorker cwWorker)
        {
            if (id != cwWorker.Id)
            {
                return BadRequest();
            }

            _context.Entry(cwWorker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CwWorkerExists(id))
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

        // PUT: api/CwWorkers/5/Location
        [HttpPut("{id}/Location")]
        public async Task<IActionResult> UpdateWorkerLocation(Guid id, [FromBody] string location)
        {
            var cwWorker = await _context.CwWorkers.FindAsync(id);
            if (cwWorker == null)
            {
                return NotFound();
            }

            cwWorker.Location = location;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CwWorkerExists(id))
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

        // POST: api/CwWorkers
        [HttpPost]
        public async Task<ActionResult<CwWorker>> PostCwWorker(CwWorker cwWorker)
        {
            cwWorker.Id = Guid.NewGuid();
            _context.CwWorkers.Add(cwWorker);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCwWorker", new { id = cwWorker.Id }, cwWorker);
        }

        // DELETE: api/CwWorkers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCwWorker(Guid id)
        {
            var cwWorker = await _context.CwWorkers.FindAsync(id);
            if (cwWorker == null)
            {
                return NotFound();
            }

            _context.CwWorkers.Remove(cwWorker);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CwWorkerExists(Guid id)
        {
            return _context.CwWorkers.Any(e => e.Id == id);
        }
    }
}
