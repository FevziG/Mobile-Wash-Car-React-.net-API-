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
    public class CwFeedbacksController : ControllerBase
    {
        private readonly CarwashContext _context;

        public CwFeedbacksController(CarwashContext context)
        {
            _context = context;
        }

        // GET: api/CwFeedbacks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CwFeedback>>> GetCwFeedbacks()
        {
            return await _context.CwFeedbacks.ToListAsync();
        }

        // GET: api/CwFeedbacks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CwFeedback>> GetCwFeedback(Guid id)
        {
            var cwFeedback = await _context.CwFeedbacks.FindAsync(id);

            if (cwFeedback == null)
            {
                return NotFound();
            }

            return cwFeedback;
        }

        // PUT: api/CwFeedbacks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCwFeedback(Guid id, CwFeedback cwFeedback)
        {
            if (id != cwFeedback.Id)
            {
                return BadRequest();
            }

            _context.Entry(cwFeedback).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CwFeedbackExists(id))
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

        // POST: api/CwFeedbacks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CwFeedback>> PostCwFeedback(CwFeedback cwFeedback)
        {
            cwFeedback.Id = Guid.NewGuid();
            _context.CwFeedbacks.Add(cwFeedback);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCwFeedback", new { id = cwFeedback.Id }, cwFeedback);
        }

        // DELETE: api/CwFeedbacks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCwFeedback(Guid id)
        {
            var cwFeedback = await _context.CwFeedbacks.FindAsync(id);
            if (cwFeedback == null)
            {
                return NotFound();
            }

            _context.CwFeedbacks.Remove(cwFeedback);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CwFeedbackExists(Guid id)
        {
            return _context.CwFeedbacks.Any(e => e.Id == id);
        }
    }
}
