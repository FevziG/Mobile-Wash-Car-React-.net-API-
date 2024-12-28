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
    public class CwUsersController : ControllerBase
    {
        private readonly CarwashContext _context;

        public CwUsersController(CarwashContext context)
        {
            _context = context;
        }

        // GET: api/CwUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CwUser>>> GetCwUsers()
        {
            return await _context.CwUsers.ToListAsync();
        }

        // GET: api/CwUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CwUser>> GetCwUser(Guid id)
        {
            var cwUser = await _context.CwUsers.FindAsync(id);

            if (cwUser == null)
            {
                return NotFound();
            }

            return cwUser;
        }

        // PUT: api/CwUsers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCwUser(Guid id, CwUser cwUser)
        {
            if (id != cwUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(cwUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CwUserExists(id))
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

        // PUT: api/CwUsers/5/Location
        [HttpPut("{id}/Location")]
        public async Task<IActionResult> UpdateUserLocation(Guid id, [FromBody] string location)
        {
            var cwUser = await _context.CwUsers.FindAsync(id);
            if (cwUser == null)
            {
                return NotFound();
            }

            cwUser.Location = location;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CwUserExists(id))
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

        // POST: api/CwUsers
        [HttpPost]
        public async Task<ActionResult<CwUser>> PostCwUser(CwUser cwUser)
        {
            cwUser.Id = Guid.NewGuid();
            _context.CwUsers.Add(cwUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCwUser", new { id = cwUser.Id }, cwUser);
        }

        // DELETE: api/CwUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCwUser(Guid id)
        {
            var cwUser = await _context.CwUsers.FindAsync(id);
            if (cwUser == null)
            {
                return NotFound();
            }

            _context.CwUsers.Remove(cwUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CwUserExists(Guid id)
        {
            return _context.CwUsers.Any(e => e.Id == id);
        }
    }
}
