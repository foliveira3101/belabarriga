using FluentValidation;
using MediatR;

namespace BelaBarriga.Api.Features.Leads;

public sealed record CreateLeadCommand(
    string Nome,
    string WhatsApp,
    string Email,
    bool Consentimento,
    string? UtmSource,
    string? UtmMedium,
    string? UtmCampaign,
    string? IpAddress) : IRequest<Guid>;

public sealed class CreateLeadValidator : AbstractValidator<CreateLeadCommand>
{
    private static readonly System.Text.RegularExpressions.Regex WhatsAppBr =
        new(@"^\+?(?:55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\s?)?\d{4}[-\s]?\d{4}$",
            System.Text.RegularExpressions.RegexOptions.Compiled);

    public CreateLeadValidator()
    {
        RuleFor(x => x.Nome).NotEmpty().MinimumLength(2).MaximumLength(200);
        RuleFor(x => x.WhatsApp).NotEmpty().Matches(WhatsAppBr)
            .WithMessage("Informe um número de WhatsApp válido (ex: (11) 99999-9999)");
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(254);
        RuleFor(x => x.Consentimento).Equal(true)
            .WithMessage("O consentimento LGPD é obrigatório");
    }
}
