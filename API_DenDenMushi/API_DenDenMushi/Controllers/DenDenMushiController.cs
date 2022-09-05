using Microsoft.AspNetCore.Mvc;
using API_DenDenMushi.Models;
using MySql.Data.MySqlClient;
using System.Net.Mail;
using System.Net;

namespace API_DenDenMushi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DenDenMushiController : ControllerBase
    {
        private readonly string connString;
        private readonly IConfiguration _configuration;

        public DenDenMushiController(IConfiguration configuration)
        {
            _configuration = configuration;

            var host = _configuration["DBHOST"] ?? "localhost";
            var port = _configuration["DBPORT"] ?? "3306";
            var password = _configuration["MYSQL_PASSWORD"] ?? "123456";
            var userid = _configuration["MYSQL_USER"] ?? "root";
            var usersDataBase = _configuration["MYSQL_DATABASE"] ?? "dendenmushi";

            connString = $"server={host}; userid={userid}; pwd={password}; port={port}; database={usersDataBase};";
        }


        [HttpPost("Login")]
        public IActionResult Post(string email, string pswd)
        {

            var users = new List<User>();
            try
            {
                string query = @"SELECT * FROM user";
                using (var connection = new MySqlConnection(connString))
                {
                    connection.Open();

                    MySqlCommand cmd = connection.CreateCommand();
                    cmd.CommandText = query;
                    MySqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        User _user = new User();
                        _user.Id = rdr.GetInt32("id");
                        _user.Email = (string)rdr["email"];
                        _user.Pswd = (string)rdr["pswd"];
                        users.Add(_user);
                    }
                    foreach(User target in users)
                    {
                        if(target.Email == email)
                        {
                            if (target.Pswd == pswd)
                            {
                                return Ok(new DataReturn
                                {
                                    Message = "Ok",
                                    Body = target
                                });
                            }
                        }
                    }
                    return Ok(new DataReturn
                    {
                        Message = "Not Ok",
                        Body = "Couldn't find email or password incorrect"
                    });
                }
            }
            catch (Exception)
            {
                return BadRequest("Can't Process Request");
            }
        }

        [HttpPost("Send")]
        public IActionResult Sendit(string from, string pswd, string to, string about, string body)
        {
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential(from, pswd),
                    EnableSsl = true
                };
                smtpClient.Send(from, to, about, body);

                return Ok(new DataReturn
                {
                    Message = "OK",
                    Body = "Finished"
                });
            }
            catch (Exception ex)
            {
                return Ok(new DataReturn
                {
                    Message = "OK",
                    Body = ex.Message
                });
            }
        }
    }
}