using backend_level_up.models;
using Microsoft.EntityFrameworkCore;

namespace backend_level_up.data
{
    public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
    {
        public required DbSet<Graduate> Graduates { get; set; }

    }
}