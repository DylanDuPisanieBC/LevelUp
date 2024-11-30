using System.ComponentModel.DataAnnotations;

namespace backend_level_up.helperClasses
{
    public class DobAttribute : ValidationAttribute
    {
        public DobAttribute() : base()
        {

        }

        public override bool IsValid(object? value)
        {
            if(value is DateOnly date)
            {
                return date < DateOnly.FromDateTime(DateTime.Now);
            }

            return false;
        }
    }
}