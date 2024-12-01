using System.Data;
using backend_level_up.data;
using backend_level_up.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;

namespace backend_level_up.controllers
{
    [ApiController]
    public class GraduateController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext = context;

        [HttpGet]
        [Route("api/graduates/get")]
        public async Task<ActionResult<List<Graduate>>> GetAllGraduates()
        {
            try
            {                              
                List<Graduate> graduates = await _dbContext.Graduates.Where(grad => grad.IsDeleted == false).ToListAsync();
                if(graduates == null)
                {                    
                    return NotFound(new { Message = "No Data."});
                }

                return Ok(graduates);
            }catch(Exception error)
            {
                Console.WriteLine(error.ToString());
                return StatusCode(500, new { Message = "Something went wrong on the server"});
            }
        }

        [HttpGet]
        [Route("api/graduates/get/{id}")]
        public async Task<ActionResult<Graduate>> GetGraduateByID([FromRoute] Guid id)
        {
            try
            {  
                Graduate? graduate = await _dbContext.Graduates.FirstOrDefaultAsync(grad => grad.GraduateId == id);
                if(graduate == null)
                {
                    return NotFound(new { Message = "Graduate not found."});
                }
                return Ok(graduate);               
            }catch(Exception error)
            {
                Console.WriteLine(error.ToString());
                return StatusCode(500, new { Message = "Something went wrong on the server"});
            }
        }

        [HttpDelete]
        [Route("api/graduates/delete/{id}")]
        public async Task<IActionResult> DeleteGraduateByID([FromRoute] Guid id)
        {
            try
            {  
                Graduate? graduate = await _dbContext.Graduates.FirstOrDefaultAsync(grad => grad.GraduateId == id);
                if(graduate == null)
                {
                    return NotFound(new { Message = "Graduate not found."});
                }

                graduate.IsDeleted = true;

                await _dbContext.SaveChangesAsync();

                return Ok(new { Message = "Graduate deleted successfully"});                
            }catch(Exception error)
            {
                Console.WriteLine(error.ToString());
                return StatusCode(500, new { Message = "Something went wrong on the server"});
            }
        }

        [HttpPost]
        [Route("api/graduates/add")]
        public async Task<IActionResult> AddGraduate([FromBody] Graduate gradToAdd)
        {
            try
            {  
                
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Graduate? duplicateGraduate = await _dbContext.Graduates.FirstOrDefaultAsync(grad => grad.EmailAddress == gradToAdd.EmailAddress);

                if(duplicateGraduate != null){
                    return  BadRequest(new { Message = "Email address already in use!"});
                }

                gradToAdd.GraduateId = Guid.NewGuid();
                gradToAdd.DateCreated = DateTime.Now;
                gradToAdd.IsDeleted = false;

                await _dbContext.Graduates.AddAsync(gradToAdd);
                await _dbContext.SaveChangesAsync();

                return Ok(new { Message = "Graduate added successfully."});
            }catch(Exception error)
            {
                Console.WriteLine(error.ToString());
                return StatusCode(500, new { Message = "Something went wrong on the server"});
            }
        }

        [HttpPut]
        [Route("api/graduates/edit")]
        public async Task<IActionResult> EditGraduate([FromBody] Graduate editedInfo)
        {
            try
            {  

                Graduate? gradToEdit = await _dbContext.Graduates.FirstOrDefaultAsync(grad => grad.GraduateId == editedInfo.GraduateId);

                if(gradToEdit == null)
                {
                    return BadRequest(new { Message = "Graduate to edit data is null"});
                }

                if(!ModelState.IsValid)
                {
                    return BadRequest(new { Message = "Model is not valid"});
                }
                List<Graduate> duplicateGraduates = new List<Graduate>();
                duplicateGraduates = await _dbContext.Graduates.Where(grad => grad.EmailAddress == editedInfo.EmailAddress).ToListAsync();

                if(duplicateGraduates.Count != 0){
                    foreach(Graduate grad in duplicateGraduates){
                        if(grad.EmailAddress == editedInfo.EmailAddress && grad.GraduateId != editedInfo.GraduateId){
                            return BadRequest(new { Message = "Email address already in use!"});
                        }
                    }
                }

                if(!String.IsNullOrEmpty(editedInfo.PhoneNumber)){
                    if(editedInfo?.PhoneNumber[0] != "+".ToCharArray()[0]){
                        return BadRequest(new { Message = "Phone Number is not valid"});
                    }
                }

                if(!String.IsNullOrEmpty(editedInfo.EmailAddress)){
                    if(!editedInfo.EmailAddress.Contains("@".ToCharArray()[0]) || !editedInfo.EmailAddress.Contains(".".ToCharArray()[0])){
                        return BadRequest(new { Message = "Email Address is not valid"});
                    }
                }

                gradToEdit.FirstName = editedInfo.FirstName;
                gradToEdit.LastName = editedInfo.LastName;
                gradToEdit.EmailAddress = editedInfo.EmailAddress;
                gradToEdit.PhoneNumber = editedInfo.PhoneNumber;
                gradToEdit.DateOfBirth = editedInfo.DateOfBirth;
                gradToEdit.DateEdited = DateTime.Now;

                await _dbContext.SaveChangesAsync();

                return Ok(gradToEdit);
            }catch(Exception error)
            {
                Console.WriteLine(error.ToString());
                return StatusCode(500, new { Message = "Something went wrong on the server"});
            }
        }


    }
}