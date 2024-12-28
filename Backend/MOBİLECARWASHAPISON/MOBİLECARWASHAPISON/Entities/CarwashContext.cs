using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using MOBILECARWASHAPISON.Entities;

namespace MOBİLECARWASHAPISON.Entities;

public partial class CarwashContext : DbContext
{
    public CarwashContext()
    {
    }

    public CarwashContext(DbContextOptions<CarwashContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CwAdmin> CwAdmins { get; set; }

    public virtual DbSet<CwAppointment> CwAppointments { get; set; }

    public virtual DbSet<CwFeedback> CwFeedbacks { get; set; }


    public virtual DbSet<CwPayment> CwPayments { get; set; }

    public virtual DbSet<CwService> CwServices { get; set; }

    public virtual DbSet<CwUser> CwUsers { get; set; }

    public virtual DbSet<CwWorker> CwWorkers { get; set; }

    public virtual DbSet<CwWorkerBalance> CwWorkerBalances { get; set; }

    public virtual DbSet<CwWorkerService> CwWorkerServices { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-TOSK7DV\\SQLARİF;Database=CARWASH;User Id=sa;Password=1234;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CwAdmin>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cw_admin__3214EC27232E6ED1");

            entity.ToTable("cw_admins");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("ID");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .HasColumnName("password_hash");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<CwAppointment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cw_appoi__3214EC27DDC8BE8D");

            entity.ToTable("cw_appointments");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("ID");
            entity.Property(e => e.AppointmentDate)
                .HasColumnType("datetime")
                .HasColumnName("appointment_date");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasColumnName("status");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.WorkerId).HasColumnName("worker_id");

            entity.HasOne(d => d.User).WithMany(p => p.CwAppointments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__cw_appoin__user___7C4F7684");

            entity.HasOne(d => d.Worker).WithMany(p => p.CwAppointments)
                .HasForeignKey(d => d.WorkerId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__cw_appoin__worke__7B5B524B");
        });

        modelBuilder.Entity<CwFeedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cw_feedb__3214EC27E6C2FB3A");

            entity.ToTable("cw_feedbacks");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("ID");
            entity.Property(e => e.FeedbackText).HasColumnName("feedback_text");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.WorkerId).HasColumnName("worker_id");

            entity.HasOne(d => d.User).WithMany(p => p.CwFeedbacks)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__cw_feedba__user___02084FDA");

            entity.HasOne(d => d.Worker).WithMany(p => p.CwFeedbacks)
                .HasForeignKey(d => d.WorkerId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__cw_feedba__worke__02FC7413");
        });

        


        modelBuilder.Entity<CwPayment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cw_payme__3214EC2746A29270");

            entity.ToTable("cw_payments");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("ID");
            entity.Property(e => e.Amount)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("amount");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.PaymentDate)
                .HasColumnType("datetime")
                .HasColumnName("payment_date");
            entity.Property(e => e.PaymentMethod)
                .HasMaxLength(50)
                .HasColumnName("payment_method");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.WorkerId).HasColumnName("worker_id");

            entity.HasOne(d => d.User).WithMany(p => p.CwPayments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__cw_paymen__user___75A278F5");

            entity.HasOne(d => d.Worker).WithMany(p => p.CwPayments)
                .HasForeignKey(d => d.WorkerId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__cw_paymen__worke__76969D2E");
        });

        modelBuilder.Entity<CwService>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cw_servi__3214EC270660DAEB");

            entity.ToTable("cw_services");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("ID");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("price");
            entity.Property(e => e.ServiceName)
                .HasMaxLength(100)
                .HasColumnName("service_name");
        });

        modelBuilder.Entity<CwUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cw_users__3214EC27C239F8D5");

            entity.ToTable("cw_users");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("ID");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .HasColumnName("password_hash");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .HasColumnName("location"); // Kullanıcıya ait lokasyon
        });

        modelBuilder.Entity<CwWorker>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cw_worke__3214EC27978191B8");

            entity.ToTable("cw_workers");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("ID");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .HasColumnName("password_hash");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15)
                .HasColumnName("phone_number");
            entity.Property(e => e.TaxNumber)
                .HasMaxLength(50)
                .HasColumnName("tax_number");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .HasColumnName("location"); // Çalışana ait lokasyon
        });

        modelBuilder.Entity<CwWorkerBalance>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cw_worke__3214EC27827EABB6");

            entity.ToTable("cw_worker_balances");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("ID");
            entity.Property(e => e.Balance)
                .HasDefaultValue(0m)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("balance");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.WorkerId).HasColumnName("worker_id");

            entity.HasOne(d => d.Worker).WithMany(p => p.CwWorkerBalances)
                .HasForeignKey(d => d.WorkerId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__cw_worker__worke__08B54D69");
        });

        modelBuilder.Entity<CwWorkerService>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cw_worke__3214EC27D5480297");

            entity.ToTable("cw_worker_services");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("ID");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.ServiceId).HasColumnName("service_id");
            entity.Property(e => e.WorkerId).HasColumnName("worker_id");

            entity.HasOne(d => d.Service).WithMany(p => p.CwWorkerServices)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__cw_worker__servi__123EB7A3");

            entity.HasOne(d => d.Worker).WithMany(p => p.CwWorkerServices)
                .HasForeignKey(d => d.WorkerId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__cw_worker__worke__114A936A");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}