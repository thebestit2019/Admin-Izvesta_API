
using Microsoft.EntityFrameworkCore;

namespace Admin_Izvestaji_API.models{

    public class ContextAR : DbContext{
        

        public DbSet<Employee> employee {get; set;}
        public DbSet<Time_in> time_in {get; set;}
        public DbSet<Time_out> time_out {get; set;}


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){

            optionsBuilder.UseNpgsql(@"Server=89.216.116.26;Port=5435;Database=company_db;User Id=postgres;Password=firmica;");
            base.OnConfiguring(optionsBuilder);
        }
    }
}