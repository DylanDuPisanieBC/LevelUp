using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend_level_up.helperClasses;

namespace backend_level_up.models
{
    public class Graduate 
    {
        [Key]
        public Guid? GraduateId {get; set;}

        [Required]
        [StringLength(50)]
        public string FirstName {get; set;} = string.Empty;

        [Required]
        [StringLength(50)]
        public string LastName {get; set;} = string.Empty;

        [StringLength(100)]
        public string? EmailAddress {get; set;} = string.Empty;

        [StringLength(100)]
        public string? PhoneNumber { get; set; } = string.Empty;

        [Required]
        [Dob]
        public DateOnly DateOfBirth {get; set;} 

        [NotMapped]
        public int Age 
        {
            get
            {
                return HelperClass.CalculateAge(this.DateOfBirth);
            }
        }

        public DateTime? DateCreated {get; set;} = DateTime.Now;

        public DateTime? DateEdited {get; set;} = null;

        public bool? IsDeleted {get; set;} = false;  
    }
}