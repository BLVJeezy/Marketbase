import { useLang } from "@/contexts/LangContext";

/**
 * Bottle body, shoulder taper and threaded neck.
 *
 * Sizing comes from the custom properties set on the scene root, so the
 * geometry in heroConfig stays authoritative for both the markup and the
 * caplet trajectories.
 */
const BottleBody = () => {
  const { t } = useLang();

  return (
    <>
      <div className="hmp-neck">
        <div className="hmp-threads" />
        <div className="hmp-cyl-shade" />
      </div>

      <div className="hmp-shoulder">
        <div className="hmp-cyl-shade" />
      </div>

      <div className="hmp-body">
        <div className="hmp-label">
          <span className="hmp-label-mark">Belgomed</span>
          <span className="hmp-label-rule" />
          <span className="hmp-label-sub">{t("hero.label.line")}</span>
          <span className="hmp-label-list">
            <span>{t("hero.label.a")}</span>
            <span>{t("hero.label.b")}</span>
            <span>{t("hero.label.c")}</span>
          </span>
          <span className="hmp-label-cert">GDP · WDA</span>
        </div>
        <div className="hmp-cyl-shade" />
      </div>
    </>
  );
};

export default BottleBody;
