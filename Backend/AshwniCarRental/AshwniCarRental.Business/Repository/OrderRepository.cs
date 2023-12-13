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
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;

        public OrderRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<int> AddCartOrder(Ordertable _event)
        {
            var newOrder = new Ordertable()
            {
                CarId = _event.CarId,
                UserEmail = _event.UserEmail,
                StartDate = _event.StartDate,
                EndDate = _event.EndDate,
                RentPrice = _event.RentPrice,
                isOrderConfirmed = _event.isOrderConfirmed,
                isReturned = _event.isReturned
            };
            await _context.Orders.AddAsync(newOrder);
            await _context.SaveChangesAsync();
            return newOrder.Id;
        }

        public async Task<Ordertable> EditCart(Ordertable _product)
        {
            var dborder = await _context.Orders.FindAsync(_product.Id);

            dborder.isOrderConfirmed = _product.isOrderConfirmed;
            dborder.isReturned = _product.isReturned;
            await _context.SaveChangesAsync();
            return dborder;
        }

        public async Task<Ordertable> EditRentalAgreement(Ordertable _product)
        {
            var dborder = await _context.Orders.FindAsync(_product.Id);

            dborder.EndDate = _product.EndDate;
            dborder.RentPrice = _product.RentPrice;
            await _context.SaveChangesAsync();
            return dborder;
        }

        public async Task<List<Ordertable>> GetAllCartProducts()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<IEnumerable<Object>> GetAllRentalAgreement()
        {
            var query = (from r in _context.Orders
                         join c in _context.products
                         on r.CarId equals c.Id
                         select new
                         {
                             r.Id,
                             r.CarId,
                             c.Car_Name,
                             c.Car_Maker,
                             c.Car_Category,
                             c.Image,
                             r.RentPrice,
                             r.StartDate,
                             r.EndDate,
                             r.isReturned,
                             r.isOrderConfirmed,
                             r.UserEmail,
                             c.Rent_Price
                         }).ToListAsync();
            return await query;
            //return await _context.Orders.ToListAsync();
        }
        public async Task<Ordertable> GetCartProductById(int id)
        {
            var dbproduct = await _context.Orders.FindAsync(id);
            return dbproduct;
        }

        public async Task<Ordertable> DeleteCartProduct(Ordertable product)
        {
            _context.Orders.Remove(product);
            await _context.SaveChangesAsync();
            return product;
        }
        public bool IsAvailable(int Id)
        {
            var query = from rent in _context.Orders
                        where rent.CarId == Id
                        select rent;

            foreach (var r in query)
            {
                if (r.isOrderConfirmed == true)
                {
                    return false;
                }
            }
            return true;
        }
    }
}
