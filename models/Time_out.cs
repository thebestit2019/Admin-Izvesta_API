using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin_Izvestaji_API.models{

      [Table("time_out", Schema="public")]
    public class Time_out{


        [Key]
        [Column("ID")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID {get; set;}

        [Column("date")]
        public string Date {get; set;}

        [Column("time")]
        public string Time {get; set;}

        [Column("pic")]
        public string Pic {get; set;}

        
        [Column("emp_key")]
        [ForeignKey("Employee.Key")]
        public int Emp_key {get; set;}


    }
}