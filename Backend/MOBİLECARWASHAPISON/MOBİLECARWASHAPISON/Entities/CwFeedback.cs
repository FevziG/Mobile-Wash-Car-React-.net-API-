using MOBILECARWASHAPISON.Entities;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MOBİLECARWASHAPISON.Entities;

public partial class CwFeedback
{
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }

    public Guid? WorkerId { get; set; }

    public string? FeedbackText { get; set; }

    public int? Rating { get; set; }

    public bool? IsActive { get; set; }
    [JsonIgnore]
    public virtual CwUser? User { get; set; }
    [JsonIgnore]
    public virtual CwWorker? Worker { get; set; }
}
