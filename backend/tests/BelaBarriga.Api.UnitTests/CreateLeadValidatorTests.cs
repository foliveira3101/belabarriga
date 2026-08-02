using BelaBarriga.Api.Features.Leads;
using FluentValidation.TestHelper;

namespace BelaBarriga.Api.UnitTests;

public class CreateLeadValidatorTests
{
    private readonly CreateLeadValidator _sut = new();

    private static CreateLeadCommand Valid() => new(
        Nome: "Maria Silva",
        WhatsApp: "(11) 99999-9999",
        Email: "maria@example.com",
        Consentimento: true,
        UtmSource: null,
        UtmMedium: null,
        UtmCampaign: null,
        IpAddress: null);

    [Fact]
    public void Valid_payload_passes()
    {
        var result = _sut.TestValidate(Valid());
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Theory]
    [InlineData("")]
    [InlineData("A")]
    public void Nome_too_short_fails(string nome)
    {
        var result = _sut.TestValidate(Valid() with { Nome = nome });
        result.ShouldHaveValidationErrorFor(x => x.Nome);
    }

    [Theory]
    [InlineData("not-an-email")]
    [InlineData("missing@")]
    [InlineData("@nodomain")]
    public void Invalid_email_fails(string email)
    {
        var result = _sut.TestValidate(Valid() with { Email = email });
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Theory]
    [InlineData("123")]
    [InlineData("abc")]
    [InlineData("")]
    public void Invalid_whatsapp_fails(string phone)
    {
        var result = _sut.TestValidate(Valid() with { WhatsApp = phone });
        result.ShouldHaveValidationErrorFor(x => x.WhatsApp);
    }

    [Theory]
    [InlineData("(11) 99999-9999")]
    [InlineData("11999999999")]
    [InlineData("+5511999999999")]
    public void Valid_whatsapp_passes(string phone)
    {
        var result = _sut.TestValidate(Valid() with { WhatsApp = phone });
        result.ShouldNotHaveValidationErrorFor(x => x.WhatsApp);
    }

    [Fact]
    public void Consent_false_fails()
    {
        var result = _sut.TestValidate(Valid() with { Consentimento = false });
        result.ShouldHaveValidationErrorFor(x => x.Consentimento);
    }

    [Fact]
    public void Empty_nome_fails()
    {
        var result = _sut.TestValidate(Valid() with { Nome = "" });
        result.ShouldHaveValidationErrorFor(x => x.Nome);
    }

    [Fact]
    public void Empty_email_fails()
    {
        var result = _sut.TestValidate(Valid() with { Email = "" });
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }
}
