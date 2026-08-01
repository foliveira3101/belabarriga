using BelaBarriga.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BelaBarriga.Api.Infrastructure.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Lead> Leads => Set<Lead>();

    protected override void OnModelCreating(ModelBuilder model)
    {
        model.Entity<Lead>(e =>
        {
            e.ToTable("leads");
            e.HasKey(l => l.Id);
            e.Property(l => l.Nome).HasMaxLength(200).IsRequired();
            e.Property(l => l.WhatsApp).HasMaxLength(20).IsRequired();
            e.Property(l => l.Email).HasMaxLength(254).IsRequired();
            e.Property(l => l.UtmSource).HasMaxLength(100);
            e.Property(l => l.UtmMedium).HasMaxLength(100);
            e.Property(l => l.UtmCampaign).HasMaxLength(100);
            e.Property(l => l.IpAddress).HasMaxLength(45);
            e.HasIndex(l => l.Email).HasDatabaseName("idx_leads_email");
            e.HasIndex(l => l.CreatedAt).HasDatabaseName("idx_leads_created_at");
        });
    }
}
