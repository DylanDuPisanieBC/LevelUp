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
                    FirstName = "Vundo",
                    LastName = "Dladla",
                    EmailAddress = "vundod@email.com",
                    PhoneNumber = "+27824522312",
                    DateOfBirth = new DateOnly(2004, 7, 30),
                    DateCreated = DateTime.Now
                }
            );
            _dbContext.SaveChanges();
        }

    }
}