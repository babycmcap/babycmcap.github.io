document.addEventListener("DOMContentLoaded", () => {

  const copyButton =
    document.getElementById("copyButton");

  const contractAddressElement =
    document.getElementById("contractAddress");

  const toast =
    document.getElementById("toast");


  /* =========================
     COPY CONTRACT ADDRESS
  ========================= */

  async function copyContractAddress() {

    if (!contractAddressElement) {
      return;
    }


    /*
      textContent mengambil CA UTUH
      yang ada di HTML.

      CSS ellipsis hanya memotong
      tampilan, bukan isi.
    */

    const address =
      contractAddressElement.textContent.trim();


    if (!address) {
      return;
    }


    /* =========================
       CLIPBOARD API
    ========================= */

    try {

      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {

        await navigator.clipboard.writeText(
          address
        );

        showCopiedState();

        return;
      }

    } catch (error) {

      console.warn(
        "Clipboard API failed. Using fallback.",
        error
      );

    }


    /* =========================
       FALLBACK COPY
    ========================= */

    const textarea =
      document.createElement("textarea");


    textarea.value = address;

    textarea.setAttribute(
      "readonly",
      ""
    );


    textarea.style.position =
      "fixed";

    textarea.style.left =
      "-9999px";

    textarea.style.top =
      "0";


    document.body.appendChild(
      textarea
    );


    textarea.focus();

    textarea.select();

    textarea.setSelectionRange(
      0,
      textarea.value.length
    );


    try {

      const successful =
        document.execCommand("copy");


      if (successful) {

        showCopiedState();

      } else {

        showCopyFailedState();

      }

    } catch (error) {

      console.error(
        "Unable to copy contract address:",
        error
      );

      showCopyFailedState();

    }


    textarea.remove();
  }


  /* =========================
     SUCCESS
  ========================= */

  let resetTimer;


  function showCopiedState() {

    clearTimeout(resetTimer);


    copyButton.textContent =
      "COPIED ✓";


    copyButton.classList.add(
      "copied"
    );


    if (toast) {

      toast.classList.add(
        "show"
      );

    }


    resetTimer =
      setTimeout(() => {

        copyButton.textContent =
          "COPY";


        copyButton.classList.remove(
          "copied"
        );


        if (toast) {

          toast.classList.remove(
            "show"
          );

        }

      }, 1800);
  }


  /* =========================
     FAILED
  ========================= */

  function showCopyFailedState() {

    clearTimeout(resetTimer);


    copyButton.textContent =
      "FAILED";


    resetTimer =
      setTimeout(() => {

        copyButton.textContent =
          "COPY";

      }, 1800);
  }


  /* =========================
     BUTTON
  ========================= */

  if (copyButton) {

    copyButton.addEventListener(
      "click",
      copyContractAddress
    );

  }

});