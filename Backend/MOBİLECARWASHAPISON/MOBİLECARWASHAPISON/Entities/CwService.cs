using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MOBİLECARWASHAPISON.Entities;

public partial class CwService
{
    public Guid Id { get; set; }

    public string? ServiceName { get; set; }

    public decimal? Price { get; set; }

    public bool? IsActive { get; set; }
    [JsonIgnore]
    public virtual ICollection<CwWorkerService> CwWorkerServices { get; set; } = new List<CwWorkerService>();
}
