using AshwniCarRental.Business.Model;
using AshwniCarRental.Business.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AshwniCarRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;


        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        [HttpPost]
        [Route("signup")]
        public async Task<SignUpModel> SignUp([FromBody] SignUpModel user)
        {
            if (user != null)
            {
                var answer = await _accountRepository.CreateUserAsync(user);

                if (!answer.Succeeded)
                {
                    foreach (var errorMessage in answer.Errors)
                    {
                        ModelState.AddModelError("", errorMessage.Description);
                    }
                    return null;
                }

                return user;
            }

            return user;
        }

        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> Login(SignInModel user)
        {
            if (ModelState.IsValid)
            {
                var answer = await _accountRepository.PasswordSignInAsync(user);
                if (string.IsNullOrEmpty(answer))
                {
                    return null;
                }
                ModelState.AddModelError("", "Invalid credentials");
                var result = new LoginResponseModel();
                result.Email = user.Email;
                result.Password = user.Password;
                result.Token = answer;
                return Ok(result);
            }
            return null;
        }

        [HttpGet]
        [Route("signout")]
        public async Task<int> Logout()
        {
            await _accountRepository.SignOutAsync();
            return StatusCodes.Status200OK;
        }
    }
}
