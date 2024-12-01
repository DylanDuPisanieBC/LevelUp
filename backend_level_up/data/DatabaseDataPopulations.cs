using backend_level_up.models;

namespace backend_level_up.data
{
    public class DataBaseDataPopulation
    {
        private readonly ApplicationDbContext _dbContext;

        public DataBaseDataPopulation(ApplicationDbContext context){
            _dbContext = context;
        }

        public void PopulateDatabase(){
            _dbContext.Graduates.AddRange(
                new Graduate
                {
                    GraduateId = Guid.NewGuid(),
                    FirstName = "Dylan",
                    LastName = "Du Pisanie",
                    EmailAddress = "dylandupisanie@gmail.com",
                    PhoneNumber = "+27824526444",
                    DateOfBirth = new DateOnly(2002, 8, 2),
                    DateCreated = DateTime.Now
                },
                new Graduate
                {
                    GraduateId = Guid.NewGuid(),
                    FirstName = "Leylan",
                    LastName = "Smith",
                    EmailAddress = "leylansmith@email.com",
                    DateOfBirth = new DateOnly(2001, 4, 22),
                    DateCreated = DateTime.Now
                },
                new Graduate
                {
                    GraduateId = Guid.NewGuid(),
                    FirstName = "Jaco",
                    LastName = "Van Dyk",
                    DateOfBirth = new DateOnly(1990, 2, 14),
                    DateCreated = DateTime.Now
                },
                new Graduate
                {
                    GraduateId = Guid.NewGuid(),
                    FirstName = "Nolitha",
                    LastName = "Dladla",
                    EmailAddress = "vundod@email.com",
                    PhoneNumber = "+27824522312",
                    DateOfBirth = new DateOnly(2004, 7, 30),
                    DateCreated = DateTime.Now
                },
                new Graduate
                {
                    GraduateId = Guid.NewGuid(),
                    FirstName = "Olivia",
                    LastName = "Bennett",
                    EmailAddress = "olivia.bennett@example.com",
                    PhoneNumber = "+27812345678",
                    DateOfBirth = new DateOnly(2001, 4, 22),
                    DateCreated = DateTime.Now
                },
                new Graduate
                {
                    GraduateId = Guid.NewGuid(),
                    FirstName = "Ethan",
                    LastName = "Peterson",
                    EmailAddress = "ethan.peterson@example.com",
                    PhoneNumber = "+27823456789",
                    DateOfBirth = new DateOnly(1998, 11, 15),
                    DateCreated = DateTime.Now
                },
                new Graduate
                {
                    GraduateId = Guid.NewGuid(),
                    FirstName = "Noah",
                    LastName = "Harris",
                    EmailAddress = "",
                    PhoneNumber = "",
                    DateOfBirth = new DateOnly(1995, 6, 30),
                    DateCreated = DateTime.Now
                },
                new Graduate
                {
                    GraduateId = Guid.NewGuid(),
                    FirstName = "Mia",
                    LastName = "Clarke",
                    EmailAddress = "",
                    PhoneNumber = "+27634567890",
                    DateOfBirth = new DateOnly(1993, 1, 27),
                    DateCreated = DateTime.Now
                },
                new Graduate
                {
                    GraduateId = Guid.NewGuid(),
                    FirstName = "Emma",
                    LastName = "Morgan",
                    EmailAddress = "emma.morgan@example.com",
                    PhoneNumber = "",
                    DateOfBirth = new DateOnly(2000, 5, 3),
                    DateCreated = DateTime.Now
                }
            );
            _dbContext.SaveChanges();
        }

    }
}