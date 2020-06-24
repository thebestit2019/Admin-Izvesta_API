using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Admin_Izvestaji_API.models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Admin_Izvestaji_API.Controllers
{
    [Route("api")]
    [ApiController]
    [DisableCors]
    public class ValuesController : ControllerBase
    {

        public ContextAR Context { get; set; }
        public JsonSerializerSettings JsonSer { get; set; }

        public ValuesController()
        {
            Context = new ContextAR();
            JsonSer = new JsonSerializerSettings() { Formatting = Formatting.Indented };
        }

        // GET api/values/allEmps
        [HttpGet]
        [Route("allEmps")]
        [DisableCors]
        public JsonResult GetAllEmps()
        {
            var allEmps = from Employee in Context.employee orderby Employee.Name select Employee;

            return new JsonResult(allEmps, JsonSer);
        }

        //GET api/values/allTimesIn
        [Route("allTimes")]
        [DisableCors]
        public JsonResult GetAllTimesIn()
        {

            var allTimes = from Time in Context.time_in select Time;

            return new JsonResult(allTimes, JsonSer);
        }

        //GET api/values/allTimesEmps
        [Route("allTimesEmps/{from_date_forma}/{to_date_forma}/{sector}/{name}/{surname}")]
        [DisableCors]
        public JsonResult GetAllTimesEmps(string from_date_forma, string to_date_forma, string sector, string name, string surname)
        {
            try
            {
                var allTimesEmps = from Employee in Context.employee
                                   join Time_in in Context.time_in on Employee.Key equals Time_in.Emp_key
                                   where Time_in.Date.CompareTo(from_date_forma) >= 0 && Time_in.Date.CompareTo(to_date_forma) <= 0
                                   where Employee.Sector == sector
                                   where Employee.Name == name
                                   where Employee.Surname == surname
                                   orderby Time_in.Date, Time_in.Time
                                   select new { Time_in.Date, Time_in.Time, Employee.Name, Employee.Surname, Employee.Sector, Employee.Id, Time_in.Pic };
                return new JsonResult(allTimesEmps, JsonSer);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Data);
                return new JsonResult(ex.Data);
            }
        }

        //GET api/values/allTimesEmps
        [Route("allTimesEmpsSec/{from_date_forma}/{to_date_forma}/{sector}")]
        [DisableCors]
        public JsonResult GetAllTimesEmpsSec(string from_date_forma, string to_date_forma, string sector)
        {
            try
            {
                var allTimesEmps = from Employee in Context.employee
                                   join Time_in in Context.time_in on Employee.Key equals Time_in.Emp_key
                                   where Time_in.Date.CompareTo(from_date_forma) >= 0 && Time_in.Date.CompareTo(to_date_forma) <= 0
                                   where Employee.Sector == sector
                                   orderby Time_in.Date, Time_in.Time
                                   select new { Time_in.Date, Time_in.Time, Employee.Name, Employee.Surname, Employee.Sector, Employee.Id, Time_in.Pic };
                return new JsonResult(allTimesEmps, JsonSer);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Data);
                return new JsonResult(ex.Data);

            }
        }

         //GET api/values/allTimesEmps
        [Route("allTimesEmpsName/{from_date_forma}/{to_date_forma}/{name}/{surname}")]
        [DisableCors]
        public JsonResult GetAllTimesEmpsName(string from_date_forma, string to_date_forma, string name, string surname)
        {
            try
            {
                var allTimesEmps = from Employee in Context.employee
                                   join Time_in in Context.time_in on Employee.Key equals Time_in.Emp_key
                                   where Time_in.Date.CompareTo(from_date_forma) >= 0 && Time_in.Date.CompareTo(to_date_forma) <= 0
                                   where Employee.Name == name
                                   where Employee.Surname == surname
                                   orderby Time_in.Date, Time_in.Time
                                   select new { Time_in.Date, Time_in.Time, Employee.Name, Employee.Surname, Employee.Sector, Employee.Id, Time_in.Pic };
                return new JsonResult(allTimesEmps, JsonSer);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Data);
                return new JsonResult(ex.Data);
            }
        }

         //GET api/values/allTimesEmps
        [Route("allTimesEmpsDate/{from_date_forma}/{to_date_forma}")]
        [DisableCors]
        public JsonResult GetAllTimesEmpsDate(string from_date_forma, string to_date_forma)
        {
            try
            {
                var allTimesEmps = from Employee in Context.employee
                                   join Time_in in Context.time_in on Employee.Key equals Time_in.Emp_key
                                   where Time_in.Date.CompareTo(from_date_forma) >= 0 && Time_in.Date.CompareTo(to_date_forma) <= 0
                                   orderby Time_in.Date, Time_in.Time
                                   select new { Time_in.Date, Time_in.Time, Employee.Name, Employee.Surname, Employee.Sector, Employee.Id, Time_in.Pic };
                return new JsonResult(allTimesEmps, JsonSer);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Data);
                return new JsonResult(ex.Data);
            }
        }




        public class dataJson
        {
            public string Id { get; set; }
            public string Code { get; set; }
            public string Name { get; set; }
            public string Surname { get; set; }
            public string Title { get; set; }
            public string Sector { get; set; }
            public int Key { get; set; }
        }



        //GET all sectors
        [Route("allSec")]
        [DisableCors]
        public JsonResult GetAllSec()
        {
            var allSec = from Employee in Context.employee orderby Employee.Sector select Employee.Sector;

            return new JsonResult(allSec.Distinct(), JsonSer);
        }


        // POST 
        [HttpPost]
        [Route("newEmp")]
        [DisableCors]
        public ActionResult Post(dataJson data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var contextForEmp = new ContextAR();

                    var newEmpEntry = new Employee
                    {
                        Id = data.Id,
                        Code = data.Code,
                        Name = data.Name,
                        Surname = data.Surname,
                        Title = data.Title,
                        Sector = data.Sector,
                        Key = data.Key
                    };

                    contextForEmp.Add(newEmpEntry);
                    contextForEmp.SaveChanges();

                    return Content("succes", "text/plain");
                }
                else
                {
                    return Content("Bad request", "text/plain");
                }
            }
            catch (Exception ex)
            {
                return Content(ex.Message, "text/plain");
            }

        }

        // PUT 
        [HttpPut("updateEmp")]
        [DisableCors]
        public ActionResult Put(dataJson data)
        {
            if (ModelState.IsValid)
            {
                var ContextAR = new ContextAR();
                Employee empToUpdate = ContextAR.employee.Single(emp => emp.Key == data.Key);

                empToUpdate.Id = data.Id;
                empToUpdate.Code = data.Code;
                empToUpdate.Name = data.Name;
                empToUpdate.Surname = data.Surname;
                empToUpdate.Title = data.Title;
                empToUpdate.Sector = data.Sector;

                ContextAR.SaveChanges();

                return Content("Succes", "text/plain");

            }
            else
            {
                return Content("Something went wrong", "text/plain");
            }
        }


    }
}
