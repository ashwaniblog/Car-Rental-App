using AshwniCarRental.Business.Model;
using AshwniCarRental.Business.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AshwniCarRental.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpPost]
        [Route("addcart")]

        public async Task<IActionResult> AddProduct(Ordertable product)
        {
            if (product != null)
            {
                var id = await _orderRepository.AddCartOrder(product);
                if (id < 0)
                {
                    return BadRequest();
                }
                return Ok(product);
            }

            return BadRequest();
        }

        [HttpPut]
        [Route("editcart")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<Ordertable> UpdateCart(Ordertable product)
        {
            //var product = await _productRepo.GetProductById(Id);
            //if (product == null)
            //{
            //    return product;
            //}
            var answer = await _orderRepository.EditCart(product);
            if (answer.Id > 0)
            {
                return product;
            }
            return product;
        }

        [HttpPut]
        [Route("editrentalagreement")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<Ordertable> UpdateRentalAgreement(Ordertable product)
        {
            
            var answer = await _orderRepository.EditRentalAgreement(product);
            if (answer.Id > 0)
            {
                return product;
            }
            return product;
        }


        [HttpGet]
        [Route("getcartorder")]
        public async Task<IActionResult> GetAllCartProducts()
        {
            var products = await _orderRepository.GetAllCartProducts();
            return Ok(products);
        }

        [HttpGet]
        [Route("getrentalagreement")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetAllRentalAgreement()
        {
            var products = await _orderRepository.GetAllRentalAgreement();
            return Ok(products);
        }

        [HttpDelete]
        [Route("deletecartproduct/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _orderRepository.GetCartProductById(id);
            if (product == null)
            {
                return BadRequest();
            }
            await _orderRepository.DeleteCartProduct(product);
        
            return Ok(product);
        }

        [HttpGet]
        [Route("isavailable/{Id}")]
        public bool IsAvailable(int Id)
        {
           return _orderRepository.IsAvailable(Id);
        }
    }
}
