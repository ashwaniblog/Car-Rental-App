using AshwniCarRental.Business.Model;
using AshwniCarRental.Business.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Threading.Tasks;

namespace AshwniCarRental.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepo;

        public ProductController(IProductRepository productRespository)
        {
            _productRepo = productRespository;
        }

        [HttpPost]
        [Route("addproduct")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]

        public async Task<IActionResult> AddProduct([FromBody] ProductModel product)
        {
            if (product != null)
            {
                var id = await _productRepo.AddProduct(product);
                if (id < 0)
                {
                    return BadRequest();
                }
                return Ok(product);
            }

            return BadRequest();
        }


        [HttpGet]
        [Route("getproduct")]
        public async Task<IActionResult> GetAllProduct()
        {
            var products = await _productRepo.GetAllProducts();
            return Ok(products);
        }

        [HttpGet]
        [Route("getsingleproduct")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var products = await _productRepo.GetProductById(id);
            return Ok(products);
        }


        [HttpPut]
        [Route("editproduct")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<ProductModel> EditProduct(ProductModel product)
        {
            //var product = await _productRepo.GetProductById(Id);
            //if (product == null)
            //{
            //    return product;
            //}
            var answer = await _productRepo.EditProduct(product);
            if (answer.Id > 0)
            {
                return product;
            }
            return product;
        }


        [HttpDelete]
        [Route("deleteproduct/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _productRepo.GetProductById(id);
            if (product == null)
            {
                return BadRequest();
            }

            await _productRepo.DeleteProduct(product);

            return Ok(product);
        }
    }
}
