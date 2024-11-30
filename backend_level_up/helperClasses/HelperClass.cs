namespace backend_level_up.helperClasses
{
    public static class HelperClass
    {
        public static int CalculateAge(DateOnly dob)
        {
            int age = DateTime.Now.Year - dob.Year;

            if(DateTime.Now.Month < dob.Month)
            {
                age--;
            }

            if(DateTime.Now.Month == dob.Month && DateTime.Now.Day < dob.Day)
            {
                age--;
            }

            return age;

        }
    }
}