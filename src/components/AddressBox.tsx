import type { PracticalEntry } from "@/lib/types";
import { fr } from "@/lib/typo";
import { IconClock, IconPhone, IconTicket, IconTrain, PlaceIcon } from "./Icons";
import { RichText } from "./RichText";

/**
 * Fiche pratique : nom en sans condensée grasse, puis ligne d'informations en italique
 * (téléphone, horaires, tarif) avec les pictogrammes du guide.
 */
export function AddressBox({ entry }: { entry: PracticalEntry }) {
  return (
    <div className="gv-address">
      <div className="name">
        <PlaceIcon kind={entry.icon} size={14} />
        <span>
          <RichText text={entry.name} />
        </span>
      </div>
      <div className="info">
        {entry.transit && (
          <span className="it">
            <IconTrain size={12} title="Accès" />
            {fr(entry.transit)}.
          </span>
        )}
        {entry.phone && (
          <span className="it">
            <IconPhone size={12} title="Téléphone" />
            {entry.phone}.
          </span>
        )}
        {entry.hours && (
          <span className="it">
            <IconClock size={12} title="Horaires d'ouverture" />
            {fr(entry.hours)}
          </span>
        )}
        {entry.admission === "paid" && (
          <span className="it">
            <IconTicket size={12} title="Entrée payante" />
          </span>
        )}
        {entry.admission === "free" && <span className="it">gratuit</span>}
        {entry.note && (
          <span className="note">
            <RichText text={`(${entry.note})`} />
          </span>
        )}
      </div>
      {entry.text && (
        <p className="gv-prose" style={{ marginTop: 3, fontSize: 13.2 }}>
          <RichText text={entry.text} />
        </p>
      )}
    </div>
  );
}
