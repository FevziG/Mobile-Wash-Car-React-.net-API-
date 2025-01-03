﻿// <auto-generated />
using System;
using MOBİLECARWASHAPISON.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MOBİLECARWASHAPISON.Migrations
{
    [DbContext(typeof(CarwashContext))]
    partial class CarwashContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwAdmin", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID")
                        .HasDefaultValueSql("(newid())");

                    b.Property<bool?>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true)
                        .HasColumnName("is_active");

                    b.Property<string>("PasswordHash")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("password_hash");

                    b.Property<string>("Username")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("username");

                    b.HasKey("Id")
                        .HasName("PK__cw_admin__3214EC27232E6ED1");

                    b.ToTable("cw_admins", (string)null);
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwAppointment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID")
                        .HasDefaultValueSql("(newid())");

                    b.Property<DateTime?>("AppointmentDate")
                        .HasColumnType("datetime")
                        .HasColumnName("appointment_date");

                    b.Property<bool?>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true)
                        .HasColumnName("is_active");

                    b.Property<string>("Status")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("status");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("user_id");

                    b.Property<Guid?>("WorkerId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("worker_id");

                    b.HasKey("Id")
                        .HasName("PK__cw_appoi__3214EC27DDC8BE8D");

                    b.HasIndex("UserId");

                    b.HasIndex("WorkerId");

                    b.ToTable("cw_appointments", (string)null);
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwFeedback", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID")
                        .HasDefaultValueSql("(newid())");

                    b.Property<string>("FeedbackText")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("feedback_text");

                    b.Property<bool?>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true)
                        .HasColumnName("is_active");

                    b.Property<int?>("Rating")
                        .HasColumnType("int")
                        .HasColumnName("rating");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("user_id");

                    b.Property<Guid?>("WorkerId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("worker_id");

                    b.HasKey("Id")
                        .HasName("PK__cw_feedb__3214EC27E6C2FB3A");

                    b.HasIndex("UserId");

                    b.HasIndex("WorkerId");

                    b.ToTable("cw_feedbacks", (string)null);
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwPayment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID")
                        .HasDefaultValueSql("(newid())");

                    b.Property<decimal?>("Amount")
                        .HasColumnType("decimal(18, 2)")
                        .HasColumnName("amount");

                    b.Property<bool?>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true)
                        .HasColumnName("is_active");

                    b.Property<DateTime?>("PaymentDate")
                        .HasColumnType("datetime")
                        .HasColumnName("payment_date");

                    b.Property<string>("PaymentMethod")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("payment_method");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("user_id");

                    b.Property<Guid?>("WorkerId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("worker_id");

                    b.HasKey("Id")
                        .HasName("PK__cw_payme__3214EC2746A29270");

                    b.HasIndex("UserId");

                    b.HasIndex("WorkerId");

                    b.ToTable("cw_payments", (string)null);
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwService", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID")
                        .HasDefaultValueSql("(newid())");

                    b.Property<bool?>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true)
                        .HasColumnName("is_active");

                    b.Property<decimal?>("Price")
                        .HasColumnType("decimal(18, 2)")
                        .HasColumnName("price");

                    b.Property<string>("ServiceName")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("service_name");

                    b.HasKey("Id")
                        .HasName("PK__cw_servi__3214EC270660DAEB");

                    b.ToTable("cw_services", (string)null);
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID")
                        .HasDefaultValueSql("(newid())");

                    b.Property<string>("Email")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("email");

                    b.Property<bool?>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true)
                        .HasColumnName("is_active");

                    b.Property<string>("PasswordHash")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("password_hash");

                    b.Property<string>("Username")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("username");

                    b.HasKey("Id")
                        .HasName("PK__cw_users__3214EC27C239F8D5");

                    b.ToTable("cw_users", (string)null);
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwWorker", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID")
                        .HasDefaultValueSql("(newid())");

                    b.Property<string>("Email")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("email");

                    b.Property<bool?>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true)
                        .HasColumnName("is_active");

                    b.Property<string>("PasswordHash")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("password_hash");

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)")
                        .HasColumnName("phone_number");

                    b.Property<string>("TaxNumber")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("tax_number");

                    b.Property<string>("Username")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("username");

                    b.HasKey("Id")
                        .HasName("PK__cw_worke__3214EC27978191B8");

                    b.ToTable("cw_workers", (string)null);
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwWorkerBalance", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID")
                        .HasDefaultValueSql("(newid())");

                    b.Property<decimal?>("Balance")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("decimal(18, 2)")
                        .HasDefaultValue(0m)
                        .HasColumnName("balance");

                    b.Property<bool?>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true)
                        .HasColumnName("is_active");

                    b.Property<Guid?>("WorkerId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("worker_id");

                    b.HasKey("Id")
                        .HasName("PK__cw_worke__3214EC27827EABB6");

                    b.HasIndex("WorkerId");

                    b.ToTable("cw_worker_balances", (string)null);
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwWorkerService", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID")
                        .HasDefaultValueSql("(newid())");

                    b.Property<bool?>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true)
                        .HasColumnName("is_active");

                    b.Property<Guid?>("ServiceId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("service_id");

                    b.Property<Guid?>("WorkerId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("worker_id");

                    b.HasKey("Id")
                        .HasName("PK__cw_worke__3214EC27D5480297");

                    b.HasIndex("ServiceId");

                    b.HasIndex("WorkerId");

                    b.ToTable("cw_worker_services", (string)null);
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwAppointment", b =>
                {
                    b.HasOne("MOBİLECARWASHAPISON.Entities.CwUser", "User")
                        .WithMany("CwAppointments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("FK__cw_appoin__user___7C4F7684");

                    b.HasOne("MOBİLECARWASHAPISON.Entities.CwWorker", "Worker")
                        .WithMany("CwAppointments")
                        .HasForeignKey("WorkerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("FK__cw_appoin__worke__7B5B524B");

                    b.Navigation("User");

                    b.Navigation("Worker");
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwFeedback", b =>
                {
                    b.HasOne("MOBİLECARWASHAPISON.Entities.CwUser", "User")
                        .WithMany("CwFeedbacks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("FK__cw_feedba__user___02084FDA");

                    b.HasOne("MOBİLECARWASHAPISON.Entities.CwWorker", "Worker")
                        .WithMany("CwFeedbacks")
                        .HasForeignKey("WorkerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("FK__cw_feedba__worke__02FC7413");

                    b.Navigation("User");

                    b.Navigation("Worker");
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwPayment", b =>
                {
                    b.HasOne("MOBİLECARWASHAPISON.Entities.CwUser", "User")
                        .WithMany("CwPayments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("FK__cw_paymen__user___75A278F5");

                    b.HasOne("MOBİLECARWASHAPISON.Entities.CwWorker", "Worker")
                        .WithMany("CwPayments")
                        .HasForeignKey("WorkerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("FK__cw_paymen__worke__76969D2E");

                    b.Navigation("User");

                    b.Navigation("Worker");
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwWorkerBalance", b =>
                {
                    b.HasOne("MOBİLECARWASHAPISON.Entities.CwWorker", "Worker")
                        .WithMany("CwWorkerBalances")
                        .HasForeignKey("WorkerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("FK__cw_worker__worke__08B54D69");

                    b.Navigation("Worker");
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwWorkerService", b =>
                {
                    b.HasOne("MOBİLECARWASHAPISON.Entities.CwService", "Service")
                        .WithMany("CwWorkerServices")
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("FK__cw_worker__servi__123EB7A3");

                    b.HasOne("MOBİLECARWASHAPISON.Entities.CwWorker", "Worker")
                        .WithMany("CwWorkerServices")
                        .HasForeignKey("WorkerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("FK__cw_worker__worke__114A936A");

                    b.Navigation("Service");

                    b.Navigation("Worker");
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwService", b =>
                {
                    b.Navigation("CwWorkerServices");
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwUser", b =>
                {
                    b.Navigation("CwAppointments");

                    b.Navigation("CwFeedbacks");

                    b.Navigation("CwPayments");
                });

            modelBuilder.Entity("MOBİLECARWASHAPISON.Entities.CwWorker", b =>
                {
                    b.Navigation("CwAppointments");

                    b.Navigation("CwFeedbacks");

                    b.Navigation("CwPayments");

                    b.Navigation("CwWorkerBalances");

                    b.Navigation("CwWorkerServices");
                });
#pragma warning restore 612, 618
        }
    }
}
