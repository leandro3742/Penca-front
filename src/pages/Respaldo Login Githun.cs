using BusinessLogic.Interfaces;
using DataAccesLayer.Models;
using Dominio.DT;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Models;
using RestSharp;
using System.Diagnostics;
using Newtonsoft.Json;

[HttpPost]
        [Route("LoginSocial")]
        public async Task<IActionResult> LoginSocial([FromBody] string token)
        {
            var client = new RestClient("https://github.com/login/oauth/access_token");
            var request = new RestRequest("/", Method.Post);
            // Json to post.
            dynamic json = new Github
            {
                client_id = "436f3043b58384f9aacc",
                client_secret = "1245cfc8da6f1d37d199a7e32a94e361d77183bc",
                code = token
            };
            string jsonToSend = JsonConvert.SerializeObject(json);
            request.RequestFormat = DataFormat.Json;
            request.AddBody(jsonToSend);
            var response = client.Execute(request);
            var aux = JsonConvert.DeserializeObject<RespuestaGithub>(response.Content);
            
            if (String.IsNullOrEmpty(aux.access_token))
            {
                return Ok(response.Content);
            }
            
            string tokenGit = aux.access_token;
            client = new RestClient("https://api.github.com/user");
            request = new RestRequest("/", Method.Get);
            request.AddHeader("Authorization", "Bearer "+tokenGit);
            response = client.Execute(request);
            var user = JsonConvert.DeserializeObject<userGithub>(response.Content);
            if (String.IsNullOrEmpty(user.email))
            {
                //Buscar por el nombre y el apellido
                //O no permitir que ingrese
            }
            return Ok(response.Content);
            //request.AddParameter("application/json; charset=utf-8", jsonToSend, ParameterType.RequestBody);
        }
