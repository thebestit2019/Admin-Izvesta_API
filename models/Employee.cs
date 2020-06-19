
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Admin_Izvestaji_API.models{

    [Table("employee", Schema="public")]
    public class Employee{

        
        [Column("id")]
        public string Id {get; set;}

        [Column("code")]
        public string Code {get; set;}

        [Column("name")]
        public string Name {get; set;}

        [Column("surname")]
        public string Surname {get; set;}

        [Column("title")]
        public string Title {get; set;}

        [Column("sector")]
        public string Sector {get; set;}

        [Key]
        [Column("key")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Key {get; set;}
    }
}