using AshwniCarRental.Business.Data;
using AshwniCarRental.Business.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AshwniCarRental.Business.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<int> AddProduct(ProductModel _event)
        {
            await _context.products.AddAsync(_event);
            await _context.SaveChangesAsync();
            return _event.Id;
        }

        public async Task<ProductModel> EditProduct(ProductModel _product)
        {
            var dbproduct = await _context.products.FindAsync(_product.Id);

            dbproduct.Car_Name = _product.Car_Name;
            dbproduct.Car_Maker = _product.Car_Maker;
            dbproduct.Car_Category = _product.Car_Category;
            dbproduct.Available_Quantity = _product.Available_Quantity;
            dbproduct.Available_Discount = _product.Available_Discount;
            dbproduct.Image = _product.Image;
            dbproduct.Rent_Price = _product.Rent_Price;
            dbproduct.Status = _product.Status;

            await _context.SaveChangesAsync();
            return dbproduct;
        }

        public async Task<ProductModel> GetProductById(int id)
        {
            var dbproduct = await _context.products.FindAsync(id);
            return dbproduct;
        }


        public async Task<ProductModel> DeleteProduct(ProductModel product)
        {
            _context.products.Remove(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<List<ProductModel>> GetAllProducts()
        {
            return await _context.products.ToListAsync();
        }
    }
}
